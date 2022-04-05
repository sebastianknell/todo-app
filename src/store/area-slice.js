import { createSlice } from "@reduxjs/toolkit";

const testAreas = [
  {
    id: 1,
    name: "Home",
  },
  {
    id: 2,
    name: "Work",
  },
];

const testProjects = [
  {
    id: 1,
    name: "To-Do app",
    notes: "",
    date: "",
    deadline: "",
    areaId: 2,
  },
];

export const areaSlice = createSlice({
  name: "area-slice",
  initialState: {
    areas: testAreas,
    projects: testProjects,
  },
  reducers: {
    replaceAreas(state, action) {
      state.areas = action.payload;
    },

    addArea(state, action) {
      state.areas.push(action.payload);
    },

    updateArea(state, action) {
      const area = action.payload;
      const index = state.areas.findIndex((item) => item.id === area.id);
      state.areas[index] = area;
    },

    removeArea(state, action) {
      const id = action.payload;
      const index = state.areas.findIndex((area) => area.id === id);
      state.areas[index].trash = !state.areas[index].trash;
    },

    replaceProjects(state, action) {
      state.projects = action.payload;
    },

    addProject(state, action) {
      state.projects.push(action.payload);
    },

    completeProject(state, action) {
      const id = action.payload;
      const index = state.projects.findIndex((item) => item.id === id);
      if (state.projects[index].completed) {
        state.projects[index].completed = false;
        state.projects[index].logged = false;
      } else {
        state.projects[index].completed = true;
      }
    },

    updateProject(state, action) {
      const project = action.payload;
      const index = state.projects.findIndex((item) => item.id === project.id);
      state.projects[index] = project;
    },

    removeProject(state, action) {
      const id = action.payload;
      const index = state.projects.findIndex((project) => project.id === id);
      state.projects[index].trash = !state.projects[index].trash;
    },
  },
});

export const areaActions = areaSlice.actions;