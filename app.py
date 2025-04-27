from flask import Flask, request, jsonify
from email_sender import enviar_codigo
import random

app = Flask(__name__)

@app.route('/enviar-codigo', methods=['POST'])
def handle_enviar_codigo():
    data = request.json
    email = data.get('email')
    
    if not email:
        return jsonify({'success': False, 'error': 'Email não fornecido'})
    
    codigo = str(random.randint(100000, 999999))
    
    if enviar_codigo(email, codigo):
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Erro ao enviar email'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
