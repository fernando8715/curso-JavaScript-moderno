class Cita{
    constructor(){
        this.citas = [];
    }

    addCita(cita){
        this.citas = [...this.citas, cita];
    }

    removeCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita );
    }
};

export default Cita;