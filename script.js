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

// 프로젝트 카드 표시 상태를 바꾸는 함수
function applyProjectFilter(filterName, filterButtons, projectCards) {
  // 모든 버튼의 active 상태를 먼저 초기화
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // 현재 선택한 버튼만 active 처리
  const activeButton = document.querySelector(`[data-filter="${filterName}"]`);
  if (activeButton) {
    activeButton.classList.add("active");
  }

  // 카드 하나씩 확인하면서 보여줄지 숨길지 결정
  projectCards.forEach((card) => {
    const cardCategory = card.dataset.category;

    // all이면 전체 표시
    if (filterName === "all") {
      card.classList.remove("hidden");
      return;
    }

    // 버튼 분류와 카드 분류가 같으면 표시, 다르면 숨김
    card.classList.toggle("hidden", cardCategory !== filterName);
  });
}

// 프로젝트 필터 기능 시작 함수
function initializeProjectFilter() {
  // 프로젝트 필터 버튼 전체 선택
  const filterButtons = document.querySelectorAll(".project-filter-button");

  // 프로젝트 카드 전체 선택
  const projectCards = document.querySelectorAll(".project-card");

  // Projects 페이지가 아니면 종료
  if (!filterButtons.length || !projectCards.length) {
    return;
  }

  // 처음에는 All 상태로 맞춤
  applyProjectFilter("all", filterButtons, projectCards);

  // 버튼 클릭 시 해당 분류로 필터 적용
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;
      applyProjectFilter(selectedFilter, filterButtons, projectCards);
    });
  });
}

// 숫자를 보기 좋게 바꾸는 함수
function formatCount(value) {
  return Number(value).toLocaleString("en-US");
}

// GitHub 프로필 HTML을 만드는 함수
function createGitHubProfileMarkup(profile) {
  return `
    <article class="github-profile-panel">
      <div class="github-avatar">
        <img src="${profile.avatar_url}" alt="GitHub profile image of ${profile.login}">
      </div>
      <div class="github-profile-text">
        <p class="github-tag">Profile</p>
        <h3>${profile.name || profile.login}</h3>
        <p class="github-description">${profile.bio || "No bio available."}</p>
        <div class="repo-meta">
          <span class="repo-chip">Public Repos ${formatCount(profile.public_repos)}</span>
          <span class="repo-chip">Followers ${formatCount(profile.followers)}</span>
          <span class="repo-chip">Following ${formatCount(profile.following)}</span>
        </div>
      </div>
      <a class="pill-link github-link-button" href="${profile.html_url}" target="_blank" rel="noopener noreferrer">
        Visit Profile
      </a>
    </article>
  `;
}

// 저장소 설명 문장을 만드는 함수
function getRepositoryDescription(repo) {
  if (repo.description) {
    return repo.description;
  }

  return "No description available.";
}

// 저장소 카드 HTML을 만드는 함수
function createRepositoryMarkup(repo) {
  return `
    <article class="github-repo-row">
      <div class="repo-main">
        <h4>${repo.name}</h4>
        <p>${getRepositoryDescription(repo)}</p>
        <div class="repo-meta">
          <span class="repo-chip">Language ${repo.language || "N/A"}</span>
          <span class="repo-chip">Stars ${formatCount(repo.stargazers_count)}</span>
          <span class="repo-chip">Forks ${formatCount(repo.forks_count)}</span>
        </div>
        <a class="pill-link repo-link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          View Repository
        </a>
      </div>
      <p class="repo-tag">Public</p>
    </article>
  `;
}

// 저장소 목록 HTML을 만드는 함수
function createRepositorySectionMarkup(repositories) {
  const repoCards = repositories
    .sort((firstRepo, secondRepo) => secondRepo.stargazers_count - firstRepo.stargazers_count)
    .map((repo) => createRepositoryMarkup(repo))
    .join("");

  return `
    <div class="github-repo-section">
      <div class="github-repo-header">
        <p class="github-tag">Repositories</p>
        <h3>Only public repositories are shown here.</h3>
      </div>
      <div class="github-repo-list">
        ${repoCards}
      </div>
    </div>
  `;
}

// GitHub API에서 프로필과 저장소 데이터를 불러오는 함수
async function fetchGitHubData(username) {
  const profileResponse = await fetch(`https://api.github.com/users/${username}`);
  const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);

  if (!profileResponse.ok || !repoResponse.ok) {
    throw new Error("Failed to load GitHub data.");
  }

  const profile = await profileResponse.json();
  const repositories = await repoResponse.json();

  return { profile, repositories };
}

// GitHub 페이지 동적 데이터 시작 함수
async function initializeGitHubSection() {
  const githubShell = document.querySelector(".github-data-shell");

  // GitHub 페이지가 아니면 종료
  if (!githubShell) {
    return;
  }

  const githubUsername = githubShell.dataset.githubUsername;
  const statusMessage = githubShell.querySelector(".github-status-message");
  const profileRoot = githubShell.querySelector(".github-profile-root");
  const repoRoot = githubShell.querySelector(".github-repo-root");

  try {
    const { profile, repositories } = await fetchGitHubData(githubUsername);

    profileRoot.innerHTML = createGitHubProfileMarkup(profile);
    repoRoot.innerHTML = createRepositorySectionMarkup(repositories);
    statusMessage.textContent = "GitHub data loaded successfully.";
  } catch (error) {
    statusMessage.textContent = "Unable to load GitHub data right now. Please try again later.";
    statusMessage.classList.add("error");
  }
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

  // 프로젝트 필터 기능 실행
  initializeProjectFilter();

  // GitHub API 데이터 불러오기
  initializeGitHubSection();
});
