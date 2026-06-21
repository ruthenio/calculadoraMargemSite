(function () {
  "use strict";

  function formatBRL(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function formatPercent(value) {
    return (value * 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
  }

  function parseNumber(input) {
    var value = parseFloat(input.value.replace(",", "."));
    return isNaN(value) ? null : value;
  }

  // Calculadora 1: margem e markup a partir de custo e venda
  var custo1 = document.getElementById("custo1");
  var venda1 = document.getElementById("venda1");
  var resLucro = document.getElementById("res-lucro");
  var resMargem = document.getElementById("res-margem");
  var resMarkup = document.getElementById("res-markup");

  function calcularMargemMarkup() {
    var custo = parseNumber(custo1);
    var venda = parseNumber(venda1);

    if (custo === null || venda === null || custo < 0 || venda < 0) {
      resLucro.textContent = "—";
      resMargem.textContent = "—";
      resMarkup.textContent = "—";
      return;
    }

    var lucro = venda - custo;
    resLucro.textContent = formatBRL(lucro);

    resMargem.textContent = venda > 0 ? formatPercent(lucro / venda) : "—";
    resMarkup.textContent = custo > 0 ? formatPercent(lucro / custo) : "—";
  }

  custo1.addEventListener("input", calcularMargemMarkup);
  venda1.addEventListener("input", calcularMargemMarkup);

  // Calculadora 2: preço de venda a partir de custo e margem desejada
  var custo2 = document.getElementById("custo2");
  var margem2 = document.getElementById("margem2");
  var resVenda = document.getElementById("res-venda");
  var resLucro2 = document.getElementById("res-lucro2");
  var resMarkup2 = document.getElementById("res-markup2");

  function calcularPrecoVenda() {
    var custo = parseNumber(custo2);
    var margemPercent = parseNumber(margem2);

    if (custo === null || margemPercent === null || custo < 0 || margemPercent < 0 || margemPercent >= 100) {
      resVenda.textContent = "—";
      resLucro2.textContent = "—";
      resMarkup2.textContent = "—";
      return;
    }

    var margem = margemPercent / 100;
    var venda = custo / (1 - margem);
    var lucro = venda - custo;

    resVenda.textContent = formatBRL(venda);
    resLucro2.textContent = formatBRL(lucro);
    resMarkup2.textContent = formatPercent(margem / (1 - margem));
  }

  custo2.addEventListener("input", calcularPrecoVenda);
  margem2.addEventListener("input", calcularPrecoVenda);

  // Tabela comparativa margem x markup (estática)
  var margens = [0.05, 0.10, 0.15, 0.20, 0.21, 0.22, 0.23, 0.24, 0.25, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90];
  var tbody = document.getElementById("tabela-comparativa-body");

  margens.forEach(function (margem) {
    var markup = margem / (1 - margem);
    var tr = document.createElement("tr");

    var tdMargem = document.createElement("td");
    tdMargem.textContent = formatPercent(margem);

    var tdMarkup = document.createElement("td");
    tdMarkup.textContent = formatPercent(markup);

    tr.appendChild(tdMargem);
    tr.appendChild(tdMarkup);
    tbody.appendChild(tr);
  });
})();
