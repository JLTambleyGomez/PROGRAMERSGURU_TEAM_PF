const { Categories, Courses } = require("../db"); 

const postCourse = async (req, res) => {
  try {
    //Obtener los datos del curso desde el cuerpo de la solicitud 
    const { title, description, imageURL, courseUrl, rating, released, isFree, language, categories } = req.body; 

      // Verificar si la categoría existe antes de crear el curso
       // Crear el curso en la base de datos utilizando el modelo Course
      const [course, created] = await Courses.findOrCreate({
        where: {
          title
        },
        defaults: {
            description,
            imageURL,
            courseUrl,
            rating,
            released,
            isFree,
            language,
        }
    });
  
    // Establecer la relación entre el curso y las categorías
    
    const response = {
      courseDataEmpty: {
        title: "",
        description: "",
        imageURL: "",
        courseUrl: "",
        rating: "",
        released: "",
        isFree: "",
        language: "",
      },
      successResponse: created
      ? "The course has been created successfully"
      : "There is already a course with the same name. Please try another",
      created,
    };
    // Devolver una respuesta con el curso creado
    if (created) {
      for (let i = 0; i < categories.length; i++) {
          const newCourseCategories = await Categories.findByPk(
            categories[i].id
          );
          await course.addCategories(newCourseCategories);
      }
      return res.json(response);
  }
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = { postCourse } 