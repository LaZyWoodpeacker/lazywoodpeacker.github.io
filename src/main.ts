import { constants } from "./constants";
import { Group } from "./group";
import { Mesh } from "./object";
import Panel from "./panel";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const border = document.getElementById("app") as HTMLDivElement;
  const options = new Panel().setOnButtonClick(() => {
    if (groups.length === 1) {
      const groupA = new Group(border, [squareA]);
      const groupB = new Group(border, [squareB]);
      groupA.setPositionCollide(
        groupA.maxX * Math.random(),
        groupA.maxY * Math.random()
      );
      groupB.setPositionCollide(
        groupB.maxX * Math.random(),
        groupB.maxY * Math.random(),
        groupA
      );
      groups = [groupA, groupB];
    }
  });

  const onSelectHandler = (obj: Mesh) => {
    groups.forEach((g) =>
      g.objects.forEach(
        (o) => (o.div.style.borderStyle = obj === o ? "dotted" : "solid")
      )
    );
    options.onSelect(obj);
  };

  const squareA = new Mesh("squareA", border)
    .setSize(100)
    .setColor(constants.colors[0])
    .setSelected(onSelectHandler)
    .setPosition(100, 200);
  const squareB = new Mesh("squareB", border)
    .setSize(100)
    .setColor(constants.colors[1])
    .setSelected(onSelectHandler)
    .setPosition(350, 300);

  let groups = [new Group(border, [squareA]), new Group(border, [squareB])];

  window.addEventListener("mouseup", () => {
    groups.forEach((g) => (g.isDragging = false));
  });

  window.addEventListener("mousemove", (e) => {
    if (groups.filter((g) => g.isDragging).length) {
      const [mesh, collide] = groups[0].isDragging
        ? [groups[0], groups[1]]
        : [groups[1], groups[0]];
      if (mesh.setPositionCollide(e.clientX, e.clientY, collide)) {
        groups = [new Group(border, [squareA, squareB])];
      }
    }
  });
});
