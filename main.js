import { goCourseObjects } from "./go-courses.js";
import { tsCourseObjects } from "./ts-courses.js";
import { devOpsCurriculumCourses } from "./devops-courses.js";

const courseArrayGo = Object.values(goCourseObjects);
const courseArrayTs = Object.values(tsCourseObjects);
const courseArrayDevOps = Object.values(devOpsCurriculumCourses);

const completedCoursesContainer = document.querySelector(".courses");
const totalLessonsDom = document.querySelector(".total-lessons");
const remainingLessonsDom = document.querySelector(".remaining-lessons");

function main() {
  const calculator = {
    getPathLength: (path) => {
      return path.reduce((acc, course) => acc + course.length, 0);
    },
    getCompletedLength: (path) => {
      return path.reduce(
        (acc, course) => acc + (course.checked ? course.length : 0),
        0,
      );
    },
    getRemainingLength: () => {},
  };

  function generateCourses(path) {
    path.forEach((course) => {
      const wrapper = document.createElement("div");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = course.name.toLowerCase().replaceAll(" ", "-");
      checkbox.checked = course.checked ?? false;

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = course.name;

      wrapper.append(checkbox, label);
      completedCoursesContainer.append(wrapper);
    });
  }

  const pathMap = {
    "Back-end (Python & Go)": courseArrayGo,
    "Back-end (Python & TypeScript)": courseArrayTs,
    "DevOps (Python & Go)": courseArrayDevOps,
  };

  let currentPath = courseArrayGo;
  let currentPathLength = calculator.getPathLength(currentPath);
  generateCourses(currentPath);
  remainingLessonsDom.value = currentPathLength;
  totalLessonsDom.textContent = currentPathLength;
  let totalCompleted = 0;
  let totalRemaining = currentPathLength;
  let daysToFinish;

  const select = document.querySelector(".path-options");
  select.addEventListener("change", (e) => {
    currentPath.forEach((course) => (course.checked = false));
    currentPath = pathMap[e.target.value];
    completedCoursesContainer.innerHTML = "";
    currentPathLength = calculator.getPathLength(currentPath);
    generateCourses(currentPath);
    remainingLessonsDom.value = currentPathLength;
    totalLessonsDom.textContent = currentPathLength;
  });

  completedCoursesContainer.addEventListener("change", (e) => {
    if (e.target.type !== "checkbox") return;

    const course = currentPath.find(
      (course) =>
        course.name.toLowerCase().replaceAll(" ", "-") === e.target.id,
    );
    if (!course) return;

    course.checked = e.target.checked;
    totalCompleted = calculator.getCompletedLength(currentPath);
    totalRemaining = currentPathLength - totalCompleted;
    remainingLessonsDom.value = totalRemaining;
    totalLessonsDom.textContent = currentPathLength;
  });

  const dailyAverageField = document.querySelector(".daily-average");
  const button = document.querySelector(".button");
  const completionEle = document.querySelector(".completion-estimate");
  button.addEventListener("click", (e) => {
    if (
      dailyAverageField.value === undefined ||
      dailyAverageField.value === "" ||
      dailyAverageField.value === null
    ) {
      alert("Enter the average number of lessons you complete a day.");
    }
    const dailyAvg = +dailyAverageField.value;
    totalRemaining = remainingLessonsDom.value;
    daysToFinish = +totalRemaining / dailyAvg;
    completionEle.textContent = Math.ceil(daysToFinish);
  });
}

main();
