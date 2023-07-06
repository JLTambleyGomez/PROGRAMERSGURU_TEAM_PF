const { Category, Course } = require("../../db"); 

const postCourse = async (req, res) => {
    try {
        //Obtener los datos del curso desde el cuerpo de la solicitud 
        const { title, description, imageURL, courseUrl, rating, released, isFree, language, categories } = req.body; 
        
        // Verificar si la categoría existe antes de crear el curso
        // Crear el curso en la base de datos utilizando el modelo Course
        const [course, created] = await Course.findOrCreate({
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
            ? "El curso fue creado exitosamente"
            : "Ya existe un curso con el mismo nombre. Pruebe con un nombre diferente",
            created,
        };

        // Devolver una respuesta con el curso creado
        if (created) {
            for (let i = 0; i < categories.length; i++) {
                const newCourseCategories = await Category.findByPk(
                    categories[i].id
                );
                await course.addCategory(newCourseCategories);
            }
            return res.json(response);
        }
        return res.status(201).json(response);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
}

module.exports = {postCourse};