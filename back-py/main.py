from flask import Flask
from json import load,dump,dumps

app = Flask(__name__)

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