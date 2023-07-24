
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