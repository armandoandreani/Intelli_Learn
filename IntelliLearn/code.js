var modulo;
var punteggio = 0;
var counter = 0;
var RISPOSTA_CORRETTA;
var RISPOSTA_UTENTE;
var idGenerati = [];

setTimeout(function() {
  setScreen("page_inizio");
}, 1500);

function reg_user() {
  readRecords("UserAccounts", { username: getText("user_reg") }, function(records) {
    if (records.length > 0) {
      showElement("label_esiste");
    } else {
      if (getText("user_reg") === "" || getText("psw_reg") === "") {
        setText("label_esiste", "Perfavore, compila tutti i campi.");
        showElement("label_esiste");
      } else {
        hideElement("label_esiste");
        createRecord("UserAccounts", {
          username: getText("user_reg"),
          psw: getText("psw_reg"),
          userid: getUserId(),
        }, function() {
          showElement("registed");
          setTimeout(function() {
            setScreen("page_inizio");
          }, 150);
        });
      }
    }
  });
}
function login_user() {
  readRecords("UserAccounts", {}, function(records) {
    readRecords("UserAccounts", {username: getText("user_log")}, function(records) {
      
    });
    var found = false;
      if(getText("user_log") == "" || getText("psw_log") == "") {
      setText("error_log_label", "");
      showElement("label_vuoto_log");
    }else { 
      setText("label_vuoto_log", "Perfavore, compila tutti i campi.");
      for(var i = 0; i < records.length; i++) {
        if(records[i].username == getText("user_log") && records[i].psw == getText("psw_log")) {
          found = true;
      } if(found == true) {
        setScreen("logged");
      } else {
        setText("label_vuoto_log", "");
        setText("error_log_label", "Username o Password incorretti.");
        showElement("error_log_label");
      }
    }
   }
  });
}
function mostra_domande() {
  setChecked("risposta_A", false);
  setChecked("risposta_B", false);
  setChecked("risposta_C", false);
  setChecked("risposta_D", false);
  if (counter < 10) {
    var n = randomNumber(0, 54);
    readRecords("domande", { id: n }, function(records) {
      RISPOSTA_CORRETTA = records[0].RISPOSTA_CORRETTA;
      setText("label_domanda", records[0].DOMANDA);
      setText("label_r1", records[0].RISPOSTA_A);
      setText("label_r2", records[0].RISPOSTA_B);
      setText("label_r3", records[0].RISPOSTA_C);
      setText("label_r4", records[0].RISPOSTA_D);
    });

    onEvent("risposta_A", "click", function() {
      RISPOSTA_UTENTE = "A";
    });
    onEvent("risposta_B", "click", function() {
      RISPOSTA_UTENTE = "B";
    });
    onEvent("risposta_C", "click", function() {
      RISPOSTA_UTENTE = "C";
    });
    onEvent("risposta_D", "click", function() {
      RISPOSTA_UTENTE = "D";
    });
  } else {
    console.log("Punteggio finale: " + punteggio);
    setScreen("punteggio");
    if(punteggio < 6) {
      setText("label_punteggio", "Torna a studiare! Hai ottenuto");
    } else if(punteggio > 6) {
      setText("label_punteggio", "Complimenti! Hai ottenuto");
    } else if(punteggio == 6) {
      setText("label_punteggio", "Potevi fare di meglio.. hai ottenuto");
    }
    setText("label_punti", punteggio);
  }
}
function mostraClassifica() {
  for (var i = 0; i < idGenerati.length; i++) {
    (function(index) {
      readRecords("UserAccounts", { id: idGenerati[index] }, function(records) {
        setText("pos_" + (index + 1), records[0].username);
      });
    })(i);
  }
}
function generaIdUnici() {
  for (var i = 0; i < 10; i++) {
    idGenerati.push(randomNumber(42, 62));
  }
}
generaIdUnici();

onEvent("btn_avanti", "click", function() {
      counter = counter + 1;
      if (RISPOSTA_UTENTE == RISPOSTA_CORRETTA) {
        punteggio++;
      }
      console.log("Corretta: " + RISPOSTA_CORRETTA + "\n");
      console.log("Utente: " + RISPOSTA_UTENTE + "\n");
      console.log("Punteggio: " + punteggio);
      mostra_domande(modulo);
    });

onEvent("btn_to_log", "click", function() {
  setScreen("login");
});

onEvent("btn_to_reg", "click", function() {
  setScreen("register");
});

onEvent("to_reg", "click", function() {
  setScreen("register");
});

onEvent("back", "click", function() {
  setScreen("page_inizio");
});

onEvent("reg_back", "click", function() {
  setScreen("page_inizio");
});

onEvent("btn_reg", "click", function() {
  reg_user();
});

onEvent("btn_log", "click", function() {
  login_user();
});

onEvent("join_now", "click", function() {
  setScreen("login");
});

onEvent("btn_start", "click", function() {
  setScreen("pagina_moduli");
});

onEvent("btn_esci", "click", function() {
  setScreen("page_inizio");
});

onEvent("moduli_back", "click", function() {
  setScreen("logged");
});

onEvent("btn_m1", "click", function() {
  setScreen("pagina_m1");
});

onEvent("btn_m2", "click", function() {
  setScreen("pagina_m2");
});

onEvent("btn_m3", "click", function() {
  setScreen("pagina_m3");
});

onEvent("about", "click", function() {
  open("https://sites.google.com/itimonaco.it/intellilearn/");
});

onEvent("btn_down_m1", "click", function() {
  open("https://www.mediafire.com/file/2adhageyqfjze2q/Modulo+1.pdf/file");
});

onEvent("btn_down_m2", "click", function() {
  open("https://www.mediafire.com/file/cn8twbx2lddkki4/Modulo+2.pdf/file");
});

onEvent("btn_down_m3", "click", function() {
  open("https://www.mediafire.com/file/2adhageyqfjze2q/Modulo+1.pdf/file");
});

onEvent("btn_test", "click", function() {
  mostra_domande();
  setScreen("pagina_quiz");
});

onEvent("btn_test2", "click", function() {
  mostra_domande();
  setScreen("pagina_quiz");
});

onEvent("btn_test3", "click", function() {
  mostra_domande();
  setScreen("pagina_quiz");
});

onEvent("btn_home", "click", function() {
  readRecords("UserAccounts", {username:getText("user_log")}, function(records){
    if(records.length > 0) {
      var updateRecordlocal = records[0];
      updateRecordlocal.punteggio = punteggio;
      updateRecord("UserAccounts",updateRecordlocal, function(record, success){
        if(success) {
          console.log("ok");
        } else {
          console.log("no ok");
        }
      });
    }
  });
  setScreen("logged");
});
onEvent("video1", "click", function() {
  open("https://www.youtube.com/watch?v=tJO_ywyHkjI&pp=ygUYaW50ZWxsaWdlbnphIGFydGlmaWNpYWxl");
});
onEvent("video3", "click", function() {
  open("https://www.youtube.com/watch?v=tJO_ywyHkjI&pp=ygUYaW50ZWxsaWdlbnphIGFydGlmaWNpYWxl");
});
onEvent("video2", "click", function() {
  open("https://www.youtube.com/watch?v=tJO_ywyHkjI&pp=ygUYaW50ZWxsaWdlbnphIGFydGlmaWNpYWxl");
});

onEvent("back_m1", "click", function() {
  setScreen("pagina_moduli");
});
onEvent("back_m2", "click", function() {
  setScreen("pagina_moduli");
});
onEvent("back_m3", "click", function() {
  setScreen("pagina_moduli");
});

onEvent("classifica_btn", "click", function() {
  setScreen("classifica");
  mostraClassifica();
});

onEvent("back_classifica", "click", function() {
  setScreen("logged");
});