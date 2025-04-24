require('dotenv').config();

const express = require('express');
const app = express();

const { loginRouter, logoutRouter } = require('./routes/auth');
const customerRoutes = require('./routes/customer');
const reservationRoutes = require('./routes/reserve');
const { flightRoutes, airportRoutes } = require('./routes/flight');
const employeeRoutes = require('./routes/employee');

app.use(express.json());

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/clientes', customerRoutes);
app.use('/reservas', reservationRoutes);
app.use('/voos', flightRoutes);
app.use('/aeroportos', airportRoutes);
app.use('/funcionarios', employeeRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`API Gateway rodando na porta ${port}`)
);
