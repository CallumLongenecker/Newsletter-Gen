import os
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

properties = {}
default_props = {
            "Business": "Creative Waco",
            "Month": "May 2024",
            "Title": "Creative Sparks Monthly Newsletter",
            "Logo": "CreativeSpark_transparent.png",
            "Logo_with_tagline": "CreativeSpark_with_tagline.png",
            "Section1": "Upcoming Events",
            "Section1.1": "Hotel Harringbone Grand Opening",
            "Section1.1_image": "HotelHarringbone.webp",
            "Section1.2": "Art in the Park",
            "Section2": "Featured Artist",
            "Section2.1": "Artist of the Month: Jane Doe",
            "Section2.2": "Jane Doe's Art Show",
            "Section3": "Community Spotlight",
            "Section3.1": "Local Business: The Coffee Shop",
            "Section3.2": "Local Music: The Band",
            "Section4": "Creative Sparks News",
            "Section4.1": "New Art Classes",
            "Section4.2": "Volunteer Opportunities",
            "Email": "info@creativewaco.org",
            "Phone": "254-555-5555",
            "Address": "712 Austin Ave, Waco TX, United States of America",
            "Website": "https://creativewaco.org/",
            "Facebook": "https://www.facebook.com/CreativeWaco",
            "Instagram": "https://www.instagram.com/CreativeWaco",
        }

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/addProperty", methods=["POST"])
def newsletter():
    #data is a list of properties for the newsletter
    global properties
    properties = {}
    app.logger.debug("Request received")
    data = request.get_json()
    app.logger.debug(data)
    for prop in data:
        if prop["property"] == "useDefault":
            properties = default_props
            break
        properties[prop["property"]] = prop["value"]
    app.logger.debug(properties)
    return data

def call_openai():
    responses = []
    global properties
    try:
        email = client.chat.completions.create(
            model = "gpt-3.5-turbo",
            messages = [
                {
                    "role": "system",
                    "content": f"""You are a great newsletter bot, intended to create newsletters in HTML that can be sent to users in an email. 
                    You create these newsletters surrounding any context given within a provided dictionary."""
                },
                {
                    "role": "user",
                    "content": f"""Please create a monthly email using the following data: 
                    {properties} 
                    Create the email in HTML format using utf-8 encoding
                    Include a header, footer, and body
                    Include the image at the top
                    Make the tone creative and engaging"""
                }
            ]
        )
        responses.append(email)
    except Exception as e:
        print(e)

    for response in responses:
        #export the email to a file
        with open("../frontend/next-app/public/email.html", "w") as f:
            f.write(response.choices[0].message.content)

    return "email.html"



@app.route("/generate", methods=["GET"])
def generate():
    app.logger.debug("Generating email")
    app.logger.debug(properties)
    return {"response": call_openai()}



load_dotenv(dotenv_path=".env")


client = OpenAI(
  api_key=os.getenv("OPENAI_API_KEY"),
)

# if __name__ == "__main__":
#     newsletter_dict = {}
#     if input("Would you like to use the example dictionary? (y/n):") == "y":
#         
#     else:
#         while True:
#             if input("new entry? (y/n):") == "n":
#                 break
#             key = input("Enter type of data: ")
#             value = input("Enter value: ")
#             newsletter_dict[key] = value
    
#     print(newsletter_dict)
#     responses = []
#     try:
#         with open("example.html") as f:
#             example = f.read()
#         email = client.chat.completions.create(
#             model = "gpt-4o",
#             messages = [
#                 {
#                     "role": "system",
#                     "content": f"""You are a great newsletter bot, intended to create newsletters in HTML that can be sent to users in an email. 
#                     You create these newsletters surrounding any context given within a provided dictionary."""
#                 },
#                 {
#                     "role": "user",
#                     "content": f"""Please create a monthly email using the following data: 
#                     {newsletter_dict} 
#                     Create the email in HTML format
#                     Include a header, footer, and body
#                     Include the image at the top
#                     Make the tone creative and engaging"""
#                 }
#             ]
#         )
#         responses.append(email)
#     except Exception as e:
#         print(e)

#     for response in responses:
#         #export the email to a file
#         with open("email.html", "w") as f:
#             f.write(response.choices[0].message.content)


        