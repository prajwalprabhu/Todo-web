from flask_cors import CORS
from flask import Flask
from json import load,dump,dumps

app = Flask(__name__)
CORS(app)
def write_json(data):
	with open("data.json","w") as f:
		dump(data,f)
def read_json():
	with open("data.json","r") as f:
		try:
			data = load(f)
			return data
		except:
			with open("data.json","w") as f:
				dump([{"name":"","date":""}],f)
			return read_json()
@app.route("/")
def root():
	return "<h1>Welcome ToDo app  </h1><br>Use /init to get data <br> /new/name/date to add todo<br> /rm/index to remove a todo"

@app.route("/new/<name>/<date>")
def new_todo(name,date):
	data = read_json()
	data.append({"name":name,"date":date})
	write_json(data)
	return "Done"


@app.route("/init")
def init():
	return dumps(read_json())

@app.route("/rm/<index>")
def rm(index):
	data = read_json()
	data.remove(data[int(index)])
	write_json(data)
	return "Done"
if __name__ == "__main__":
	# print(help(app))
	app.run(debug=True,port=8000)