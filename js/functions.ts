/*Función Environment Class*/
enum EnvClass {
  Eco = "ECO",
  Zero= "0",
  B= "0",
  Z= "0",
}

function change_env_class() {
  const env_class = $("#env_class").val();
  if (env_class != "") {
    const discount = get_discount(env_class);
    if (discount > 0) {
      document.getElementById("eco_discount").innerHTML = discount + "% discount";
    } else {
      document.getElementById("eco_discount").innerHTML = "no discount";
    }
  } else {

    document.getElementById("eco_discount").innerHTML = "";
  }
}

function get_discount(env_class) {
  let discount = 0;
  switch (env_class) {
    case EnvClass.Eco:
      discount = 5;
      break;
    case EnvClass.Zero:
      discount = 10;
      break;
    default:
      discount = 0;
  }
  return discount;
}


/**Validación MATRÍCULA*/
$.validator.addMethod("plate", function(value, element, param){
  const resultado = value.match(/([0-9]{4}[A-Za-z]{3})|([A-Za-z]{2}[0-9]{4}[A-Za-z]{2})/g);

  if (resultado === null) {
    return false;

  }else {
    return true;
  }
}, "Please enter a valid carplate");




/*Función y validación DNI*/
function change_dni() {
  const dni = <string>$("#dni").val();
  if (dni.length == 8) {
    const dni_num = parseInt(dni);
    document.getElementById("dnil").innerHTML = dni_letter(dni_num);
  } else {
    document.getElementById("dnil").innerHTML = "";
  }
}
function dni_letter(dni: number) {
  const letters = "TRWAGMYFPDXBNJZSQVHLCKE";
  const resto = dni % 23;
  const letter = letters.substr(resto, 1);
  return letter;
}


$.validator.addMethod("nif", function(value, element, param){
  const resultado = value.match(/\d{8}[a-zA-Z]/g);

  if (resultado === null) {
    return false;
  }else {
    return true;
  }
}, "Please enter a valid DNI");


/*Función y validación EDAD*/
function calc_age(birth_date:string) {
  let b_date = new Date(birth_date);
  let n_date = new Date();
  let dif = n_date.getTime() - b_date.getTime();
  let dif_days = dif / (1000 * 3600 * 24 * 365);
  return Math.round(dif_days);
}

function change_birth_date() {
  const birth_date = <string>$("#birth_date").val();
  if (birth_date != "") {
    const age = calc_age(birth_date);
    if (age < 100 && age > 0) {
      document.getElementById("age").innerHTML = age + " years old";
    } else {
      document.getElementById("age").innerHTML = "";
    }
  } else {
    document.getElementById("age").innerHTML = "";
  }
}

$.validator.addMethod('age', function(value, element, param) {
  const age = calc_age(value);
  if (age >= param.from && age <= param.to) {
      return true;
  }
  return false;
}, "Is not a valid age");




/*VALIDACIÓN FORMULARIO*/

 $("form").validate({
   errorClass:"text-danger",
   rules: {
     email: {
       required: true,
       email: true,
     },

      password: {
       required: true,
       minlength: 8,
     },

      password2: {
       equalTo: "#password",
     },

      dni:{
        nif: true,
      },
      birthdate: {
       age: {
         from: 18,
         to: 99
        }
      },

      carplate: {
        required: true,
        plate: true,
      },
      mySelect:{
        required:true,
      },

    },
    messages: {
dni: {
required: "Introduce un dni con letra",
nif: "Introduce un DNI de 8 números y 1 letra",
},
carplate: {
required: "Introduce un número de matrícula",
plate: "Introduce una matrícula válida",
},
birthdate: {
required: "Introduce tu edad",
cumple: "Introduce una edad entre 18 y 99",
},
mySelect: {
required: "Introduce un número de matrícula",
},
},
});
