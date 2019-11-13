#!/usr/bin/env python
# -*- coding: utf-8 -*-
#-------------------------------------------------------------------------
# Archivo: monitor.py
# Capitulo: 3 Estilo Publica-Subscribe
# Autor(es): Perla Velasco & Yonathan Mtz.
# Version: 2.0.1 Mayo 2017
# Descripción:
#
#   Ésta clase define el rol del monitor, es decir, muestra datos, alertas y advertencias sobre los signos vitales de los adultos mayores.
#
#   Las características de ésta clase son las siguientes:
#
#                                            monitor.py
#           +-----------------------+-------------------------+------------------------+
#           |  Nombre del elemento  |     Responsabilidad     |      Propiedades       |
#           +-----------------------+-------------------------+------------------------+
#           |        Monitor        |  - Mostrar datos a los  |         Ninguna        |
#           |                       |    usuarios finales.    |                        |
#           +-----------------------+-------------------------+------------------------+
#
#   A continuación se describen los métodos que se implementaron en ésta clase:
#
#                                             Métodos:
#           +------------------------+--------------------------+-----------------------+
#           |         Nombre         |        Parámetros        |        Función        |
#           +------------------------+--------------------------+-----------------------+
#           |  print_notification()  |  - datetime: fecha en que|  - Imprime el mensa-  |
#           |                        |     se envió el mensaje. |    je recibido.       |
#           |                        |  - id: identificador del |                       |
#           |                        |     dispositivo que      |                       |
#           |                        |     envió el mensaje.    |                       |
#           |                        |  - value: valor extremo  |                       |
#           |                        |     que se desea notifi- |                       |
#           |                        |     car.                 |                       |
#           |                        |  - name_param: signo vi- |                       |
#           |                        |     tal que se desea no- |                       |
#           +------------------------+--------------------------+-----------------------+
#           |   format_datetime()    |  - datetime: fecha que se|  - Formatea la fecha  |
#           |                        |     formateará.          |    en que se recibió  |
#           |                        |                          |    el mensaje.        |
#           +------------------------+--------------------------+-----------------------+
#
#-------------------------------------------------------------------------


class Monitor:

    def print_notification(self, datetime, id, value, name_param, model):
        print ("  ---------------------------------------------------")
        print ("    ADVERTENCIA")
        print ("  ---------------------------------------------------")
        print ("    Se ha detectado un incremento de " + str(name_param) + " (" + str(value) + ")" + " a las " + str(self.format_datetime(datetime)) + " en el adulto mayor que utiliza el dispositivo " + str(model) + ":" + str(id))
        print ("")
        print ("")

    def format_datetime(self, datetime):
        values_datetime = datetime.split(' ')
        hours_datetime = values_datetime[4].split(':')

        f_datetime = hours_datetime[0] + ":" + hours_datetime[1] + " del " + \
            values_datetime[0] + "/" + \
            values_datetime[1] + "/" + values_datetime[2]
        return f_datetime

    def print_notification_trip(self, datetime, id, model):
        print ("  ---------------------------------------------------")
        print ("    ADVERTENCIA")
        print ("  ---------------------------------------------------")
        print ("    Se ha detectado una caida " + " a las " + str(self.format_datetime(datetime)) + " en el adulto mayor que utiliza el dispositivo " + str(model) + ":" + str(id))
        print ("")
        print ("")

    def print_notification_trip(self, datetime, id, model):
        print ("    Se ha detectado una caida a las " + str(self.format_datetime(datetime)) + " en el adulto mayor que utiliza el dispositivo " + str(model) + ":" + str(id))
        print ("")
        print ("")

    def print_notification_medicine(self, time, medicine, dose, id, model):
        print ("    Le toca la medicina " + str(medicine) + " con dosis de " + str(dose) + "mg en el adulto mayor que utiliza el dispositivo " + str(model) + ":" + str(id))
        print (    "Hora: " + str(time[0:2]) + ":" + str(time[3:5]))
        print ("")