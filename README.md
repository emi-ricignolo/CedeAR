# CedeApp

English:

React Native App that displays stock values converted to "CEDEAR"
a CEDEAR is a fraction of a stock that is bought in the local currency of Argentina, instead of the US dollar.

This allows for investors to buy shares in a foreing company without having to deposit US dollars
Cedear values are calculated by the value of the CCL divided by the ratio of each stock

So this app:
- Calculate the CEDEAR value for each stock according to the ratio and real time value of CCL fetched from an API
- Allows you to track the CEDEAR value for each stock
- Saves your Portfolio in LocalStorage
- Daily price movement chart for each stock
- Delete and add stocks to portfolio
- Automatically find the ratio of each stock

What would be great to add:
- Refresh on scroll to top
- Buying a better API for real time without limits

This is the app:

![gif](https://i.imgur.com/SBmKJxD.gif)

**Español:**

Aplicación en React Native para seguir los precios de CEDEARs que agregues a tu Portfolio
Los CEDEAR son un bono fracción de una Acción para poder invertir en el mercado internacional a precio de Peso Argentino

La aplicación:
- Calcula el valor de cada CEDEAR dividiendo por el Ratio individual de cada uno (Tomado de un índice de Ratios) y multiplica ese valor por el valor en tiempo real del CCL a través de una API
- Actualización del valor de cada CEDEAR al iniciar la app
- Guarda tu portafolio en el LocalStorage para que permanezca al abrir y cerrar la app
- Muestra un gráfico para cada CEDEAR individual de los precios en el día
- Permite borrar y agregar en tu portafolio fácilmente

Features a agregar:
- Actualizar al scrollear hacia arriba
- API sin límite de pago

*Creada por Emiliano Ricignolo*
