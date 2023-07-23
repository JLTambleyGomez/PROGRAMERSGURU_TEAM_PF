const { Technology, Course } = require("../../db");

const postCourse = async (req, res) => {
    try {
        // Obtener los datos del curso desde el cuerpo de la solicitud
        const {
            title,
            description,
            imageURL,
            courseUrl,
            released,
            isFree,
            language,
            tecnology,
        } = req.body;

        // Crear el curso en la base de datos utilizando el modelo Course
        const [course, created] = await Course.findOrCreate({
            where: {
                title,
            },
            defaults: {
                description,
                imageURL,
                courseUrl,
                released,
                isFree,
                language,
            },
        });
        
        const response = {
            courseDataEmpty: {
                title: "",
                description: "",
                imageURL: "",
                courseUrl: "",
                released: "",
                isFree: "",
                language: "",
            },
            message: created
                ? "El curso fue creado exitosamente"
                : "Ya existe un curso con el mismo nombre. Pruebe con un nombre diferente",
            created,
        };
        
        // Establecer la relación entre el curso y las categorías utilizando una transacción
        if (created) {
            for (let i = 0; i < tecnology.length; i++) {
                const newCourseTechnology = await Technology.findByPk(
                    tecnology[i].id
                );
                await course.addTechnology(newCourseTechnology);
            }
            return res.status(201).json(response);
        }

        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

module.exports = { postCourse };