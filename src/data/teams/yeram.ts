import type { Team } from "@/types/domain";

// 고정 정기 예배 없음(타이니 하우스 등 비정기 집회·초청 위주). 집회는 gatherings/yeram.ts.
export const team: Team = {
  id: "yeram",
  name: "예람워십",
  nameEn: "Yeram Worship",
  description:
    "예람워십(Yeram Worship)은 2018년부터 활동한 경남·부산 기반의 찬양 사역팀입니다. 혁신적인 편곡과 사운드로 10~30대 다음 세대에게 큰 사랑을 받으며, '혼자 걷지 않을 거예요'·'삭개오의 노래' 등으로 알려졌습니다. 현재 사송영락교회(경남 양산)를 거점으로 사역합니다.",
  regions: ["경남", "부산"],
  links: {
    youtube: "https://www.youtube.com/@yeramworship",
    instagram: "https://www.instagram.com/yeramworship",
    facebook: "https://www.facebook.com/yeram.yc",
  },
};
