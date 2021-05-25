const CSE = {
  1: ["M2", "EG", "PPS", "AP"],
  2: ["DBMS", "JAVA", "BEFA", "OS", "DM"],
};

export const subjectsApi = {
  cse: CSE,
};

const branches = [
  { label: "CSE", value: "cse" },
  { label: "ECE", value: "ece" },
  { label: "IT", value: "it" },
];

const years = [
  { label: "first", value: 1 },
  { label: "second", value: 2 },
  { label: "third", value: 3 },
  { label: "fourth", value: 4 },
];

export const classesOptions = [
  {
    label: "CSE",
    value: "cse",
    children: [
      {
        label: "First",
        value: "first",
        children: [
          {
            label: "A",
            value: "A",
            children: [
              { label: "M2", value: "M2" },
              { label: "EG", value: "EG" },
              { label: "PPS", value: "PPS" },
              { label: "AP", value: "AP" },
            ],
          },
          {
            label: "B",
            value: "B",
            children: [
              { label: "M2", value: "M2" },
              { label: "EG", value: "EG" },
              { label: "PPS", value: "PPS" },
              { label: "AP", value: "AP" },
            ],
          },
          {
            label: "C",
            value: "C",
            children: [
              { label: "M2", value: "M2" },
              { label: "EG", value: "EG" },
              { label: "PPS", value: "PPS" },
              { label: "AP", value: "AP" },
            ],
          },
        ],
      },
      {
        label: "Second",
        value: "second",
        children: [
          {
            label: "A",
            value: "A",
            children: [
              { label: "JAVA", value: "JAVA" },
              { label: "OS", value: "OS" },
              { label: "DBMS", value: "DBMS" },
              { label: "BEFA", value: "BEFA" },
              { label: "DS", value: "DS" },
            ],
          },
          {
            label: "B",
            value: "B",
            children: [
              { label: "JAVA", value: "JAVA" },
              { label: "OS", value: "OS" },
              { label: "DBMS", value: "DBMS" },
              { label: "BEFA", value: "BEFA" },
              { label: "DS", value: "DS" },
            ],
          },
        ],
      },
      { label: "Third", value: "third" },
      { label: "Fourth", value: "fourth" },
    ],
  },
  {
    label: "ECE",
    value: "ece",
    children: [],
  },
  {
    label: "IT",
    value: "it",
    children: [],
  },
];
