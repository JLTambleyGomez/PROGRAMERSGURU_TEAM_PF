const SelectTechnologies = ({ tecnology,selectedTechnologies, setSelectedTechnologies }) => {
    console.log(selectedTechnologies);

    return (
        <div>
            <select
                multiple
                value={selectedTechnologies}
                onChange={(e) => {
                    const techId = Number(e.target.value)
                    if (selectedTechnologies.includes(techId)){
                        setSelectedTechnologies(selectedTechnologies.filter(id => id !== techId))
                    } else {
                        setSelectedTechnologies([...selectedTechnologies, techId]);
                    }
                }}
            >
                {tecnology.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                        {tech.name}
                    </option>
                ))}
            </select>
            
        </div>
    );
};

export default SelectTechnologies;
