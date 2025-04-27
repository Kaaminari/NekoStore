from flask import Flask, request, jsonify
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/github-auth', methods=['POST'])
def github_auth():
    github_token = os.getenv('GITHUB_TOKEN')
    # Aqui você pode implementar a lógica de autenticação
    # usando o token do GitHub
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
