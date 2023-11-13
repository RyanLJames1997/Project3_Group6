from flask import Flask, render_template

app = Flask(__name__)

# Define a route for the specified HTML page
@app.route("/restaurants_obesity_2019.html")
def restaurants_obesity_2019():
    print("Server received request for 'restaurants_obesity_2019' page...")
    return render_template('restaurants_obesity_2019.html')

# You can define other routes if needed

if __name__ == '__main__':
    app.debug = True
    app.run(port=8000)
