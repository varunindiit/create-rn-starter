import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { moderateScale } from "react-native-size-matters";
import {
  Avatar,
  Header,
  MainContainer,
  RNText,
  Divider,
} from "../../components";
import { ArrowRightIcon } from "../../components/Icon/SvgIcons";
import { THEME } from "../../theme";
import { RootState } from "../../redux/store";
import RouteKey from "../../navigation/RouteKey";
import { useLanguage } from "../../localization";

const Messages: React.FC = () => {
  const nav = useNavigation<any>();
  const { t } = useLanguage();
  const conversations = useSelector((s: RootState) => s.chat.conversations);

  return (
    <MainContainer gradient>
      <Header safeArea={false} title={t("messages.title")} showBack={false} />
      <FlatList
        data={conversations}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <Divider style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.row}
            onPress={() =>
              nav.navigate(RouteKey.Chat, {
                conversationId: item.id,
                title: item.name,
              })
            }
          >
            <Avatar name={item.name} size={moderateScale(56)} />
            <View style={styles.info}>
              <RNText font="semibold" size={16} color={THEME.text}>
                {item.name}
              </RNText>
              <View style={styles.routeRow}>
                <RNText size={14} color={THEME.text}>
                  {item.route.from}
                </RNText>
                <ArrowRightIcon
                  size={moderateScale(14)}
                  color={THEME.text}
                />
                <RNText size={14} color={THEME.text}>
                  {item.route.to}
                </RNText>
              </View>
              <RNText size={12} color={THEME.labelBrown} style={styles.date}>
                {item.lastTime}
              </RNText>
            </View>
            {item.unread ? (
              <View style={styles.badge}>
                <RNText size={10} color="#fff" font="bold">
                  {item.unread}
                </RNText>
              </View>
            ) : null}
          </TouchableOpacity>
        )}
      />
    </MainContainer>
  );
};

export default Messages;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(100),
  },
  separator: {
    marginVertical: moderateScale(14),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flex: 1,
    marginLeft: moderateScale(14),
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(2),
    gap: moderateScale(6),
  },
  date: {
    marginTop: moderateScale(4),
  },
  badge: {
    minWidth: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.primary,
  },
});
