import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { moderateScale } from "react-native-size-matters";
import {
  Dropdown,
  Header,
  ImagePickerSheet,
  MainContainer,
  RNButton,
  RNText,
} from "../../components";
import {
  CheckCircleSmallIcon,
  ChevronDownIcon,
  CloudUploadIcon,
  PencilEditIcon,
  PersonAvatarIcon,
  XCircleOutlineIcon,
} from "../../components/Icon/SvgIcons";
import { FONTS, SPACING, THEME } from "../../theme";
import { RootState } from "../../redux/store";
import { setAvatarUri, setProfile } from "../../redux/slice/userProfile";
import { useLanguage } from "../../localization";

type PickerTarget = "avatar" | "nationalId" | null;

const EditProfile: React.FC = () => {
  const nav = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const profile = useSelector((s: RootState) => s.userProfile.profile);
  const [picker, setPicker] = useState<PickerTarget>(null);

  const GENDER_OPTIONS = [
    { label: t("gender.male"), value: "Male" },
    { label: t("gender.female"), value: "Female" },
    { label: t("gender.other"), value: "Other" },
  ];

  return (
    <MainContainer gradient statusBarStyle="dark-content">
      <Header title={t("editProfile.title")} safeArea={false} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          style={styles.avatarWrap}
          onPress={() => setPicker("avatar")}
          hitSlop={6}
        >
          <View style={styles.avatarRing}>
            {profile.avatarUri ? (
              <Image
                source={{ uri: profile.avatarUri }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <PersonAvatarIcon
                  size={moderateScale(56)}
                  color={THEME.primary}
                />
              </View>
            )}
          </View>
          <View style={styles.editBadge}>
            <PencilEditIcon size={moderateScale(14)} color="#FFFFFF" />
          </View>
        </Pressable>

        <FieldLabel>{t("auth.fullName")}</FieldLabel>
        <View style={styles.inputBox}>
          <TextInput
            value={profile.fullName}
            onChangeText={(t) => dispatch(setProfile({ fullName: t }))}
            style={styles.input}
            placeholderTextColor={THEME.textPlaceholder}
            allowFontScaling={false}
          />
        </View>

        <FieldLabel>{t("auth.dateOfBirth")}</FieldLabel>
        <View style={styles.inputBox}>
          <TextInput
            value={profile.dob}
            onChangeText={(t) => dispatch(setProfile({ dob: t }))}
            style={styles.input}
            placeholderTextColor={THEME.textPlaceholder}
            allowFontScaling={false}
          />
        </View>

        <FieldLabel>{t("auth.gender")}</FieldLabel>
        <Dropdown
          value={profile.gender ?? null}
          options={GENDER_OPTIONS}
          onChange={(val) =>
            dispatch(
              setProfile({ gender: val as "Male" | "Female" | "Other" }),
            )
          }
          placeholder={t("auth.selectGender")}
          title={t("auth.selectGender")}
          rightIcon={
            <ChevronDownIcon
              size={moderateScale(18)}
              color={THEME.textMuted}
            />
          }
          triggerStyle={styles.dropdownTrigger}
        />

        <FieldLabel>{t("editProfile.aboutMe")}</FieldLabel>
        <View style={[styles.inputBox, styles.textArea]}>
          <TextInput
            value={profile.about}
            onChangeText={(t) => dispatch(setProfile({ about: t }))}
            style={[styles.input, styles.inputMulti]}
            multiline
            textAlignVertical="top"
            placeholderTextColor={THEME.textPlaceholder}
            allowFontScaling={false}
          />
        </View>

        <FieldLabel>{t("editProfile.nationalId")}</FieldLabel>
        <RNText
          size={11}
          color={THEME.textMuted}
          style={styles.helperText}
        >
          {t("editProfile.nationalIdHint")}
        </RNText>
        {profile.nationalIdImageUri ? (
          <Pressable
            style={styles.uploadFilled}
            onPress={() => setPicker("nationalId")}
          >
            <Image
              source={{ uri: profile.nationalIdImageUri }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <View style={styles.replaceBadge}>
              <RNText size={11} font="semibold" color="#fff">
                {t("common.replace")}
              </RNText>
            </View>
          </Pressable>
        ) : (
          <Pressable
            style={styles.uploadBox}
            onPress={() => setPicker("nationalId")}
          >
            <CloudUploadIcon
              size={moderateScale(26)}
              color={THEME.primary}
            />
            <RNText
              size={12}
              font="medium"
              color={THEME.text}
              style={{ marginTop: moderateScale(6) }}
            >
              {t("common.uploadImage")}
            </RNText>
            <RNText
              size={10}
              color={THEME.textMuted}
              style={{ marginTop: moderateScale(2) }}
            >
              {t("common.uploadFormatsHint")}
            </RNText>
          </Pressable>
        )}

        <View style={styles.contactList}>
          <ContactRow
            verified={!!profile.isPhoneVerified}
            value={`${profile.countryCode} ${profile.phone}`}
            onChange={() => {}}
          />
          <View style={styles.contactDivider} />
          <ContactRow
            verified={!!profile.isEmailVerified}
            value={profile.email}
            onChange={() => {}}
          />
        </View>

        <RNButton
          title={t("common.update")}
          onPress={() => nav.goBack()}
          containerStyle={styles.updateBtn}
        />
      </ScrollView>

      <ImagePickerSheet
        visible={picker !== null}
        onClose={() => setPicker(null)}
        onPicked={(img) => {
          if (picker === "avatar") {
            dispatch(setAvatarUri(img.path));
          } else if (picker === "nationalId") {
            dispatch(setProfile({ nationalIdImageUri: img.path }));
          }
        }}
        circular={picker === "avatar"}
      />
    </MainContainer>
  );
};

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <RNText
    size={13}
    font="medium"
    color={THEME.labelBrown}
    style={styles.label}
  >
    {children}
  </RNText>
);

const ContactRow = ({
  verified,
  value,
  onChange,
}: {
  verified: boolean;
  value: string;
  onChange: () => void;
}) => {
  const { t } = useLanguage();
  return (
  <View style={styles.contactRow}>
    {verified ? (
      <CheckCircleSmallIcon size={moderateScale(18)} color={THEME.text} />
    ) : (
      <XCircleOutlineIcon size={moderateScale(18)} color={THEME.text} />
    )}
    <RNText
      size={14}
      color={THEME.text}
      style={styles.contactValue}
      numberOfLines={1}
    >
      {value}
    </RNText>
    <TouchableOpacity onPress={onChange} hitSlop={8}>
      <RNText size={13} font="medium" color={THEME.primary}>
        {t("common.change")}
      </RNText>
    </TouchableOpacity>
  </View>
  );
};

export default EditProfile;

const AVATAR_SIZE = moderateScale(108);
const AVATAR_INNER = moderateScale(96);

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(40),
  },
  avatarWrap: {
    alignSelf: "center",
    marginTop: moderateScale(8),
    marginBottom: moderateScale(18),
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  avatarRing: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: moderateScale(2.5),
    borderColor: THEME.primary,
    padding: moderateScale(3),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.backgroundAlt,
  },
  avatar: {
    width: AVATAR_INNER,
    height: AVATAR_INNER,
    borderRadius: AVATAR_INNER / 2,
  },
  avatarPlaceholder: {
    backgroundColor: THEME.primaryFaint,
    alignItems: "center",
    justifyContent: "center",
  },
  editBadge: {
    position: "absolute",
    top: moderateScale(3),
    right: moderateScale(3),
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(13),
    backgroundColor: THEME.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginTop: moderateScale(14),
    marginBottom: moderateScale(8),
  },
  helperText: {
    marginTop: -moderateScale(4),
    marginBottom: moderateScale(8),
    lineHeight: moderateScale(16),
  },
  inputBox: {
    minHeight: moderateScale(52),
    borderRadius: SPACING.radiusPill,
    borderWidth: 1,
    borderColor: THEME.inputBorder,
    backgroundColor: THEME.surface,
    paddingHorizontal: moderateScale(20),
    justifyContent: "center",
  },
  input: {
    color: THEME.text,
    fontFamily: FONTS.regular,
    fontSize: moderateScale(14, 0.3),
    paddingVertical: 0,
  },
  dropdownTrigger: {
    height: moderateScale(52),
    paddingHorizontal: moderateScale(20),
    borderRadius: SPACING.radiusPill,
    backgroundColor: THEME.surface,
  },
  textArea: {
    minHeight: moderateScale(110),
    borderRadius: moderateScale(22),
    paddingHorizontal: moderateScale(18),
    paddingVertical: moderateScale(14),
    justifyContent: "flex-start",
  },
  inputMulti: {
    minHeight: moderateScale(82),
    lineHeight: moderateScale(20),
  },
  uploadBox: {
    minHeight: moderateScale(110),
    borderRadius: moderateScale(18),
    borderWidth: 1.2,
    borderStyle: "dashed",
    borderColor: THEME.primary,
    backgroundColor: "rgba(255, 243, 234, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(18),
  },
  uploadFilled: {
    height: moderateScale(140),
    borderRadius: moderateScale(18),
    overflow: "hidden",
    backgroundColor: THEME.surfaceMuted,
  },
  replaceBadge: {
    position: "absolute",
    right: moderateScale(10),
    bottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(12),
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  contactList: {
    marginTop: moderateScale(22),
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(14),
    gap: moderateScale(12),
  },
  contactValue: {
    flex: 1,
  },
  contactDivider: {
    height: 1,
    backgroundColor: THEME.divider,
  },
  updateBtn: {
    marginTop: moderateScale(28),
  },
});
