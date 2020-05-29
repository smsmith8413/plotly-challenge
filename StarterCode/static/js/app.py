from flask import Flask, jsonify


app = Flask(__name__)

hello_dict = ("samples.json")


@app.route("/")
def home():
    return "Hi"


@app.route("/normal")
def normal():
    return hello_dict


@app.route("/json")
def jsonified():
    return json(hello_dict)


if __name__ == "__main__":
    app.run(debug=True)
