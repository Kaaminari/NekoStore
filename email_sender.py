
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

def enviar_codigo(email_destino, codigo):
    # Configurações do email
    email_remetente = "seu-email@gmail.com"  # Substitua pelo seu email
    senha_app = os.getenv('EMAIL_PASSWORD')   # Senha do app do Gmail
    
    # Criar mensagem
    msg = MIMEMultipart()
    msg['From'] = email_remetente
    msg['To'] = email_destino
    msg['Subject'] = "Código de Recuperação de Senha"
    
    corpo = f"""
    Seu código de recuperação de senha é: {codigo}
    
    Se você não solicitou esta recuperação, ignore este email.
    """
    
    msg.attach(MIMEText(corpo, 'plain'))
    
    try:
        # Conectar ao servidor SMTP do Gmail
        servidor = smtplib.SMTP('smtp.gmail.com', 587)
        servidor.starttls()
        servidor.login(email_remetente, senha_app)
        
        # Enviar email
        texto = msg.as_string()
        servidor.send_message(msg)
        servidor.quit()
        return True
    except Exception as e:
        print(f"Erro ao enviar email: {e}")
        return False
