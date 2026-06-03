import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { moderateScale } from "react-native-size-matters";
import Svg, { Path } from "react-native-svg";
import { Avatar, MainContainer, RNText } from "../../components";
import { THEME, SPACING, FONTS } from "../../theme";
import { RootState } from "../../redux/store";
import { sendMessage } from "../../redux/slice/chat";
import { useLanguage } from "../../localization";
import {
  ArrowRightIcon,
  ArrowRightSmallIcon,
  CarIcon,
  ChevronLeftIcon,
} from "../../components/Icon/SvgIcons";

const SendPlaneIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = "#fff",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21.5 2.5L11 13"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.5 2.5L15 21.5L11 13L2.5 9L21.5 2.5Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const Chat: React.FC = () => {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const flatListRef = useRef<FlatList>(null);
  const convId = route.params?.conversationId || "c1";
  const title = route.params?.title || "Matt Mitchell";
  const conv = useSelector(
    (s: RootState) =>
      s.chat.conversations.find((c) => c.id === convId) ||
      s.chat.conversations[0],
  );
  const [text, setText] = useState("");

  useEffect(() => {
    const t = setTimeout(
      () => flatListRef.current?.scrollToEnd({ animated: false }),
      80,
    );
    return () => clearTimeout(t);
  }, []);

  const onSend = () => {
    if (!text.trim()) return;
    dispatch(sendMessage({ conversationId: conv.id, text }));
    setText("");
    setTimeout(
      () => flatListRef.current?.scrollToEnd({ animated: true }),
      80,
    );
  };

  return (
    <MainContainer gradient>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => nav.goBack()}
            activeOpacity={0.7}
            hitSlop={10}
            style={styles.backBtn}
          >
            <ChevronLeftIcon size={moderateScale(22)} color={THEME.text} />
          </TouchableOpacity>
          <Avatar name={title} size={moderateScale(44)} />
          <View style={styles.headerText}>
            <RNText font="semibold" size={16} color={THEME.text}>
              {title}
            </RNText>
            <RNText
              size={12}
              color={THEME.textMuted}
              style={{ marginTop: moderateScale(2) }}
            >
              {t("messages.repliesIn")}
            </RNText>
          </View>
        </View>

        <View style={styles.routeBar}>
          <View style={styles.routeRow}>
            <CarIcon size={moderateScale(18)} color={THEME.primary} />
            <RNText
              font="semibold"
              size={14}
              color={THEME.text}
              style={{ marginLeft: moderateScale(8) }}
            >
              {conv.route.from}
            </RNText>
            <ArrowRightSmallIcon
              size={moderateScale(14)}
              color={THEME.text}
            />
            <RNText font="semibold" size={14} color={THEME.text}>
              {conv.route.to}
            </RNText>
            <View style={styles.flex} />
            <ArrowRightIcon size={moderateScale(18)} color={THEME.text} />
          </View>
          <RNText
            size={11}
            color={THEME.textMuted}
            style={{ marginTop: moderateScale(2), marginLeft: moderateScale(26) }}
          >
            {t("messages.passengerCount")}
          </RNText>
        </View>

        <FlatList
          ref={flatListRef}
          data={conv.messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: false })
          }
          renderItem={({ item }) => {
            const isMine = item.sender === "me";
            return (
              <View
                style={[
                  styles.bubble,
                  isMine ? styles.mine : styles.other,
                ]}
              >
                <RNText
                  size={14}
                  color={isMine ? "#fff" : THEME.text}
                  style={styles.bubbleText}
                >
                  {item.text}
                </RNText>
                <RNText
                  size={11}
                  color={
                    isMine ? "rgba(255,255,255,0.85)" : THEME.textMuted
                  }
                  style={styles.timeText}
                >
                  {item.time}
                </RNText>
              </View>
            );
          }}
        />

        <View style={styles.inputBar}>
          <View style={styles.inputWrap}>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder={t("messages.typeMessage")}
              placeholderTextColor={THEME.textPlaceholder}
              style={styles.input}
              multiline
            />
          </View>
          <TouchableOpacity
            onPress={onSend}
            style={styles.sendBtn}
            activeOpacity={0.85}
          >
            <SendPlaneIcon size={moderateScale(18)} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

export default Chat;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(12),
  },
  backBtn: {
    width: moderateScale(36),
    height: moderateScale(36),
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerText: {
    marginLeft: moderateScale(10),
    flex: 1,
  },
  routeBar: {
    marginHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: THEME.divider,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(6),
  },
  list: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(14),
    gap: moderateScale(10),
  },
  bubble: {
    maxWidth: "80%",
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(18),
  },
  mine: {
    backgroundColor: THEME.primary,
    alignSelf: "flex-end",
    borderBottomRightRadius: moderateScale(6),
  },
  other: {
    backgroundColor: "#F5E5D3",
    alignSelf: "flex-start",
    borderBottomLeftRadius: moderateScale(6),
  },
  bubbleText: {
    lineHeight: moderateScale(20),
    fontFamily: FONTS.regular,
  },
  timeText: {
    marginTop: moderateScale(4),
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(10),
    gap: moderateScale(10),
  },
  inputWrap: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: SPACING.radiusPill,
    paddingHorizontal: moderateScale(18),
    paddingVertical: Platform.OS === "ios" ? moderateScale(12) : moderateScale(4),
    minHeight: moderateScale(46),
    justifyContent: "center",
    shadowColor: THEME.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    fontFamily: FONTS.regular,
    fontSize: moderateScale(14),
    color: THEME.text,
    padding: 0,
    margin: 0,
    maxHeight: moderateScale(100),
  },
  sendBtn: {
    width: moderateScale(46),
    height: moderateScale(46),
    borderRadius: moderateScale(23),
    backgroundColor: THEME.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
});
