import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { moderateScale } from "react-native-size-matters";
import {
  Avatar,
  Card,
  Header,
  MainContainer,
  RNText,
  SegmentedControl,
} from "../../components";
import { THEME, SPACING } from "../../theme";
import { RootState } from "../../redux/store";
import { useLanguage } from "../../localization";
import Svg, { Path } from "react-native-svg";

const StarIcon = ({
  size = 14,
  color = THEME.star,
  filled = true,
}: {
  size?: number;
  color?: string;
  filled?: boolean;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2.5l2.97 6.02 6.65.97-4.81 4.69 1.14 6.62L12 17.77 6.05 20.8l1.14-6.62L2.38 9.49l6.65-.97L12 2.5Z"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth={filled ? 0 : 1.6}
      strokeLinejoin="round"
    />
  </Svg>
);

const SummaryStars = ({ value, total = 5 }: { value: number; total?: number }) => (
  <View style={styles.summaryStarsRow}>
    {Array.from({ length: total }).map((_, i) => (
      <View key={i} style={{ marginRight: i === total - 1 ? 0 : moderateScale(8) }}>
        <StarIcon size={moderateScale(28)} color={THEME.primary} filled={i < value} />
      </View>
    ))}
  </View>
);

const Ratings: React.FC = () => {
  const { t } = useLanguage();
  const [tab, setTab] = useState("received");
  const r = useSelector((s: RootState) => s.ratings);
  const list = tab === "received" ? r.received : r.given;
  const isReceived = tab === "received";

  const TABS = [
    { key: "received", label: t('common.received') },
    { key: "given", label: t('common.given') },
  ];

  return (
    <MainContainer gradient statusBarStyle="dark-content">
      <Header title={t("profile.ratings")} safeArea={false} />
      <View style={styles.tabsWrap}>
        <SegmentedControl tabs={TABS} value={tab} onChange={setTab} variant="underline" />
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {isReceived && (
          <Card style={styles.summary} shadow>
            <View style={styles.summaryTopRow}>
              <RNText font="bold" size={36} color={THEME.text}>
                {r.average}
                <RNText size={16} color={THEME.textMuted} font="regular">
                  /5
                </RNText>
              </RNText>
            </View>
            <RNText size={12} color={THEME.textMuted} style={styles.ratingsCount}>
              {t("rating.basedOnReviews", { count: r.totalReviews })}
            </RNText>
            <SummaryStars value={r.average} />
          </Card>
        )}

        <View style={styles.reviewsWrap}>
          {list.map((rev, idx) => (
            <View key={rev.id}>
              <View style={styles.reviewItem}>
                <View style={styles.head}>
                  <Avatar name={rev.authorName} size={36} />
                  <View style={styles.nameWrap}>
                    <RNText font="semibold" size={14} color={THEME.text}>
                      {rev.authorName}
                    </RNText>
                  </View>
                  <View style={styles.ratingBox}>
                    <StarIcon size={14} color={THEME.star} />
                    <RNText font="semibold" size={14} color={THEME.text} style={styles.ratingValue}>
                      {rev.rating}.0
                    </RNText>
                  </View>
                </View>
                <RNText
                  size={13}
                  color={THEME.textSecondary}
                  lineHeight={moderateScale(20)}
                  style={styles.comment}
                >
                  {`“${rev.comment}”`}
                </RNText>
              </View>
              {idx < list.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default Ratings;

const styles = StyleSheet.create({
  summaryStarsRow: { flexDirection: "row" },
  tabsWrap: { paddingHorizontal: SPACING.xl },
  scroll: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: moderateScale(60),
    paddingTop: SPACING.lg,
  },
  summary: {
    padding: SPACING.xl,
    borderRadius: SPACING.radiusLg,
    marginBottom: SPACING.xl,
  },
  summaryTopRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  ratingsCount: {
    marginTop: moderateScale(2),
    marginBottom: SPACING.md,
  },
  reviewsWrap: {},
  reviewItem: {
    paddingVertical: SPACING.md,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameWrap: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingValue: {
    marginLeft: moderateScale(4),
  },
  comment: {
    marginTop: SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.border,
    marginVertical: moderateScale(4),
  },
});
