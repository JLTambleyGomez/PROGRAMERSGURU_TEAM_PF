import {
  ORDER,
  FILTER_COURSES_BY_LANGUAGE,
  FILTER_PRICE,
  ERROR,
  GET_CATEGORIES,
  POST_CATEGORIES,
  DARK_MODE,
} from "./actions";

const goblalStorage = {
  allCourses: [
    {
      title: "Introducción a la programación",
      description: "Aprende los conceptos básicos de la programación",
      rating: 4.5,
      free: true,
      language: "Español",
    },
    {
      title: "Web Development 101",
      description: "Learn the fundamentals of web development",
      rating: 4.2,
      free: false,
      language: "English",
    },
    {
      title: "Data Science for Beginners",
      description: "Get started with data science and analytics",
      rating: 4.7,
      free: true,
      language: "English",
    },
    {
      title: "Aprende Photoshop desde cero",
      description: "Descubre cómo utilizar Photoshop para editar imágenes",
      rating: 4.1,
      free: true,
      language: "Español",
    },
    {
      title: "Machine Learning Fundamentals",
      description: "Learn the basics of machine learning algorithms",
      rating: 4.3,
      free: false,
      language: "English",
    },
  ],
  courses: [
    {
      title: "Introducción a la programación",
      description: "Aprende los conceptos básicos de la programación",
      rating: 4.5,
      free: true,
      language: "Español",
    },
    {
      title: "Web Development 101",
      description: "Learn the fundamentals of web development",
      rating: 4.2,
      free: false,
      language: "English",
    },
    {
      title: "Data Science for Beginners",
      description: "Get started with data science and analytics",
      rating: 4.7,
      free: true,
      language: "English",
    },
    {
      title: "Aprende Photoshop desde cero",
      description: "Descubre cómo utilizar Photoshop para editar imágenes",
      rating: 4.1,
      free: true,
      language: "Español",
    },
    {
      title: "Machine Learning Fundamentals",
      description: "Learn the basics of machine learning algorithms",
      rating: 4.3,
      free: false,
      language: "English",
    },
  ],
  categories: [],

  message: [],

  darkMode: false,
};

export default function rootReducer(state = goblalStorage, actions) {
  switch (actions.type) {
    //case 'GET_COURSES':
    //  return { ...state, allCourses: actions.payload, courses: actions.payload };

    case FILTER_COURSES_BY_LANGUAGE:
      return {
        ...state,
        courses: state.allCourses.filter(
          (course) => course.language === actions.payload
        ),
      };

    case FILTER_PRICE:
      return {
        ...state,
        courses: state.allCourses.filter(
          (course) => course.free === actions.payload
        ),
      };

    case ORDER:
      const todos_cursosOrdenados = [...state.allCourses];
      const cursosOrdenados = [...state.courses];

      if (actions.payload === "ABC+") {
        todos_cursosOrdenados.sort(
          (a, b) =>
            a.title.toLowerCase().charCodeAt(0) -
            b.title.toLowerCase().charCodeAt(0)
        );
        cursosOrdenados.sort(
          (a, b) =>
            a.title.toLowerCase().charCodeAt(0) -
            b.title.toLowerCase().charCodeAt(0)
        );
      } else if (actions.payload === "ABC-") {
        todos_cursosOrdenados.sort(
          (a, b) =>
            b.title.toLowerCase().charCodeAt(0) -
            a.title.toLowerCase().charCodeAt(0)
        );
        cursosOrdenados.sort(
          (a, b) =>
            b.title.toLowerCase().charCodeAt(0) -
            a.title.toLowerCase().charCodeAt(0)
        );
      }
      return {
        ...state,
        allCourses: todos_cursosOrdenados,
        courses: cursosOrdenados,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: actions.payload,
      };

    case POST_CATEGORIES:
      return {
        ...state,
        message: actions.payload.data.message,
      };
    case DARK_MODE:
      return {
        ...state,
        darkMode: actions.payload,
      };
    default:
      return { ...state };
  }
}
