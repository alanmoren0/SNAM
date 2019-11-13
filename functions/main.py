from flask import Flask, render_template
from email.header import Header
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import smtplib
import email.message
import jinja2


def send_email_notification(request):
    input_json = request.get_json()
    msg = MIMEMultipart('alternative')
    msg.set_charset('utf8')
    msg['Subject'] = Header(input_json['subject'].encode('utf-8'),'UTF-8').encode()
    msg['From'] = input_json['from']
    msg['To'] = input_json['to']
    
    template_filename = "notification-template.html.j2"
    render_vars = input_json['data']
    template_file_path = './'
    environment = jinja2.Environment(loader=jinja2.FileSystemLoader(template_file_path))
    email_content = environment.get_template(template_filename).render(render_vars)
    _attach = MIMEText(email_content.encode('utf-8'), 'html', 'UTF-8')
    msg.attach(_attach)
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login("yamop.16@gmail.com", "pbwtmtqntfvvnjbl")
    server.sendmail(msg['From'], [msg['To']], msg.as_string().encode("utf-8"))
    server.quit()
    return json.dumps({"msg": "Email sent"}), 200