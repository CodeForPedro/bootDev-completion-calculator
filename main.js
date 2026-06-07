import { courseArrayGo } from "./go-courses.js";
import { courseArrayTs } from "./ts-courses.js";
import { courseArrayDevOps } from "./devops-courses.js";

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

  const select = document.querySelector(".path-options");
  select.addEventListener("change", (e) => {
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
    let totalCompleted = calculator.getCompletedLength(currentPath);
    let totalRemaining = currentPathLength - totalCompleted;
    remainingLessonsDom.value = totalRemaining;
    totalLessonsDom.textContent = currentPathLength;
  });
}

main();
