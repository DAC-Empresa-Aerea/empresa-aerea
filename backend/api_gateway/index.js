require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const { loginRouter, logoutRouter } = require('./routes/auth');
const customerRoutes = require('./routes/customer');
const reservationRoutes = require('./routes/reserve');
const { flightRoutes, airportRoutes, getFlightRoute } = require('./routes/flight');
const employeeRoutes = require('./routes/employee');

app.use(express.json());
app.use(cors());

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/clientes', customerRoutes);
app.use('/reservas', reservationRoutes);
app.use('/voos', flightRoutes);
app.use('/voo', getFlightRoute)
app.use('/aeroportos', airportRoutes);
app.use('/funcionarios', employeeRoutes);

const port = process.env.PORT || 8080;

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      status,
      message: err.message
    }
  });
});

app.listen(port, () =>
  console.log(`API Gateway rodando na porta ${port}`)
);
