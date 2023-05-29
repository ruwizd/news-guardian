from flask import Flask, jsonify, request, render_template, redirect, url_for
from prediction_model import PredictionModel
import pandas as pd
from random import randrange

from flask_cors import CORS
import smtplib

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = '4c99e0361905b9f941f17729187afdb9'
ORG_EMAIL = "@gmail.com" 
FROM = "elinavik777" + ORG_EMAIL 
PWD = "ovjqqvnyffuistju" 
SMTP_SERVER = "imap.gmail.com" 
SMTP_PORT = 993
SUBJECT = "Urgent Notice: Fake News Alert!"
TEXT = "We regret to inform you that your recent news content has been identified as fake. We kindly remind you not to engage in such practices again. Upholding the principles of truth and integrity is crucial for our publication's credibility. Please ensure the accuracy of your future submissions."


@app.route('/predict', methods=['POST', 'GET'])
def predict():
    req_data = request.get_json(force=True)
    original_text = req_data['original_text']
    email = req_data['email']
    model = PredictionModel(original_text)

    TO = [email] 

    # Prepare actual message
    message = """From: %s\nTo: %s\nSubject: %s\n\n%s
    """ % (FROM, ", ".join(TO), SUBJECT, TEXT)
    res = model.predict()
    if(res['prediction'] == 'FAKE'):
        try:
                server = smtplib.SMTP("smtp.gmail.com", 587)
                server.ehlo()
                server.starttls()
                server.login(FROM, PWD)
                server.sendmail(FROM, TO, message)
                server.close()
        except:
            return "failed to send mail"
                   
    response = jsonify(model.predict())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    

if __name__ == '__main__':
    app.run()

