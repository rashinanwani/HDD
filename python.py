from flask import Flask, jsonify, request

from flask_restful import Resource, Api

from flask_restful.utils import cors

from flask_cors import CORS

import sqlalchemy

import pyodbc

import numpy as np

import pandas as pd

# import matplotlib.pyplot as plt

from datetime import datetime

 

 

# creating a Flask app

app = Flask(__name__)

# creating an API object

api = Api(app)

 

 

ENGINE = sqlalchemy.create_engine('mssql://Usr1:1234567890@LAPTOP-DHF75SUF/HDDServer?driver=ODBC+Driver+17+for+SQL+Server')# ENGINE.connect()

 

print(ENGINE)

print(ENGINE.connect())

 

 

 

 

# another resource to calculate the square of a number

class Regression(Resource):

    @cors.crossdomain(origin='*')

    def get(self,servername):

        N=2

        print(servername)  

        # servername = 'LT079861_1'

        query = 'SELECT ServerName,TStamp,ServerSize,CAST(TStamp as DATE) as Date FROM dbo.'+str(servername)+'GraphData'

        data_ = pd.read_sql(sql=query , con = ENGINE)

        print(data_)

        data_['mov_avg'] = data_.iloc[:,2].rolling(window=N).mean()

        data_['T_Stamp'] = data_['TStamp'].values.astype(np.int64) // 10 ** 6

        data_ = data_.sort_values(by='T_Stamp') 

        print(data_)

        data_json=data_.reset_index()[['ServerName','TStamp','ServerSize','Date','T_Stamp']].values.tolist()

        print(data_)

        data = {}    

        

        data["moving_avg"] =data_json

        return jsonify({'data': data})


api.add_resource(Regression, '/getPredictiondata/<string:servername>')

 

if __name__ == '__main__':

  

    app.run(debug = True)