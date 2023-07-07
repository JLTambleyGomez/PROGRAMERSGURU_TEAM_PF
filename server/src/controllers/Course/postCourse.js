const { Technology, Course } = require("../../db");

const postCourse = async (req, res) => {
    try {
        // Obtener los datos del curso desde el cuerpo de la solicitud
        const {
            title,
            description,
            imageURL,
            courseUrl,
            rating,
            released,
            isFree,
            language,
            categories,
        } = req.body;

        // Verificar si la categoría existe antes de crear el curso
        const existingCategories = await Technology.findAll({
            where: {
                id: categories.map((category) => category.id),
            },
        });

        // Crear el curso en la base de datos utilizando el modelo Course
        const [course, created] = await Course.findOrCreate({
            where: {
                title,
            },
            defaults: {
                description,
                imageURL,
                courseUrl,
                rating,
                released,
                isFree,
                language,
            },
        });

        // Establecer la relación entre el curso y las categorías utilizando una transacción
        if (created) {
            await course.addTechnologies(existingCategories, { through: 'CourseTecnology' });
        }

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
                ? "El curso fue creado exitosamente"
                : "Ya existe un curso con el mismo nombre. Pruebe con un nombre diferente",
            created,
        };

        // Devolver una respuesta con el curso creado
        return res.status(created ? 201 : 200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

module.exports = { postCourse };
