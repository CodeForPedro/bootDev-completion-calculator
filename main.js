import { courseArrayGo } from "./go-courses.js";
import { courseArrayTs } from "./ts-courses.js";
import { courseArrayDevOps } from "./devops-courses.js";

const completedCoursesContainer = document.querySelector(".courses");

function main() {
  // Generate Calculator
  function generateCourses(path) {
    path.forEach((course) => {
      const wrapper = document.createElement("div");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = course.name.toLowerCase().replaceAll(" ", "-");

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = course.name;

      wrapper.append(checkbox, label);
      completedCoursesContainer.append(wrapper);
    });
  }
  // Generates default
  generateCourses(courseArrayGo);

  // Triggers when user changes path
  const select = document.querySelector(".path-options");
  select.addEventListener("change", (e) => {
    const currentValue = e.target.value;
    console.log(currentValue);
    if (currentValue === "Back-end (Python & Go)") {
      completedCoursesContainer.innerHTML = "";
      generateCourses(courseArrayGo);
    }
    if (currentValue === "Back-end (Python & TypeScript)") {
      completedCoursesContainer.innerHTML = "";
      generateCourses(courseArrayTs);
    }
    if (currentValue === "DevOps (Python & Go)") {
      completedCoursesContainer.innerHTML = "";
      generateCourses(courseArrayDevOps);
    }
  });
}

main();
