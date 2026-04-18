// 테마 저장용 key
const THEME_STORAGE_KEY = "portfolio-theme";

// body에 night-theme를 적용하거나 제거하는 함수
function applyTheme(themeName) {
  // night-theme일 때만 dark 테마 클래스 적용
  document.body.classList.toggle("night-theme", themeName === "night");
}

// 현재 테마에 따라 버튼 문구를 바꾸는 함수
function updateThemeButton(themeButton, themeName) {
  // 버튼 안 텍스트 영역 선택
  const buttonText = themeButton.querySelector(".theme-toggle-text");

  // night 테마면 문구를 Night Mode로 표시
  if (themeName === "night") {
    buttonText.textContent = "Night Mode";
    return;
  }

  // 기본 테마면 문구를 Switch Theme로 표시
  buttonText.textContent = "Switch Theme";
}

// 저장된 테마 불러오기
function getSavedTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) || "default";
}

// 테마 저장하기
function saveTheme(themeName) {
  localStorage.setItem(THEME_STORAGE_KEY, themeName);
}

// 현재 테마를 반대로 바꾸는 함수
function toggleTheme(themeButton) {
  // body에 night-theme가 있으면 기본 테마로, 없으면 night 테마로 전환
  const nextTheme = document.body.classList.contains("night-theme") ? "default" : "night";

  // 화면에 테마 적용
  applyTheme(nextTheme);

  // 현재 테마 저장
  saveTheme(nextTheme);

  // 버튼 문구도 함께 갱신
  updateThemeButton(themeButton, nextTheme);
}

// 페이지가 모두 읽힌 뒤 실행
document.addEventListener("DOMContentLoaded", () => {
  // 테마 버튼 선택
  const themeButton = document.querySelector(".theme-toggle-button");

  // 버튼이 없는 페이지면 종료
  if (!themeButton) {
    return;
  }

  // 저장된 테마 먼저 불러오기
  const savedTheme = getSavedTheme();

  // 저장된 테마 적용
  applyTheme(savedTheme);

  // 버튼 문구도 현재 테마에 맞게 맞춤
  updateThemeButton(themeButton, savedTheme);

  // 버튼 클릭 시 테마 전환
  themeButton.addEventListener("click", () => {
    toggleTheme(themeButton);
  });
});
