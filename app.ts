type User ={
    nombre:string;
    edad: number;
};

function isadulto(user:User):boolean
{
    return user.edad >= 18;
}

const drio:User = 
{
    nombre: 'Drio',
    edad: 25
};

const isDrioAdulto:boolean = isadulto(drio);
console.log("es adulto",isDrioAdulto);