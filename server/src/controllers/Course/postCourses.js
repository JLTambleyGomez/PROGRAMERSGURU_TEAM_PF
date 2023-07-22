// const { Technology, Course } = require("../../db");

// const postCourses = async (req, res) => {
//     try {
//         // Obtener el array de cursos desde el cuerpo de la solicitud
//         const coursesData = req.body;

//         const response = [];

//         // Recorrer cada curso en el array y crearlo en la base de datos
//         for (let i = 0; i < coursesData.length; i++) {
//             const {
//                 title,
//                 description,
//                 imageURL,
//                 courseUrl,
//                 rating,
//                 released,
//                 isFree,
//                 language,
//                 categories,
//             } = coursesData[i];

//             // Crear el curso en la base de datos utilizando el modelo Course
//             const [course, created] = await Course.findOrCreate({
//                 where: {
//                     title,
//                 },
//                 defaults: {
//                     description,
//                     imageURL,
//                     courseUrl,
//                     rating,
//                     released,
//                     isFree,
//                     language,
//                 },
//             });

//             const courseResponse = {
//                 courseDataEmpty: {
//                     title: "",
//                     description: "",
//                     imageURL: "",
//                     courseUrl: "",
//                     rating: "",
//                     released: "",
//                     isFree: "",
//                     language: "",
//                 },
//                 message: created
//                     ? "El curso fue creado exitosamente"
//                     : "Ya existe un curso con el mismo nombre. Pruebe con un nombre diferente",
//                 created,
//             };

//             if (created) {
//                 for (let j = 0; j < categories.length; j++) {
//                     const newCourseTechnology = await Technology.findByPk(
//                         categories[j].id
//                     );
//                     await course.addTechnology(newCourseTechnology);
//                 }
//             }

//             response.push(courseResponse);
//         }

//         return res.status(201).json(response);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Algo salió mal" });
//     }
// };

// module.exports = { postCourses };

const fs = require('fs');
const path = require('path');
const { Course } = require("../../db"); // Importa tu modelo de cursos

const cursosFilePath = path.join(__dirname, './courses.json');

const postCourses = async (req, res) => {
  try {
    const archivoCursos = fs.readFileSync(cursosFilePath, 'utf8');

    const cursos = JSON.parse(archivoCursos).courses;

    await Course.bulkCreate(cursos);

    return res.status(200).json({ message: 'Cursos creados exitosamente.' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error al crear los cursos. ' + error.message });
  }
};

module.exports = {
    postCourses,
};