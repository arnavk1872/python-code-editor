from flask import Flask, request, render_template_string, jsonify
import subprocess
import tempfile
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

HTML = '''
<!doctype html>
<html>
<head>
  <title>Mini Coding Editor</title>
  <style>
    body { font-family: sans-serif; margin: 2em; }
    textarea { width: 100%; height: 200px; font-family: monospace; }
    pre { background: #f4f4f4; padding: 1em; }
  </style>
</head>
<body>
  <h1>Mini Python Editor</h1>
  <form method="post">
    <textarea name="code">{{code}}</textarea><br>
    <button type="submit">Run</button>
  </form>
  {% if output %}
  <h2>Output:</h2>
  <pre>{{output}}</pre>
  {% endif %}
</body>
</html>
'''

@app.route('/', methods=['GET', 'POST'])
def index():
    code = ''
    output = ''
    if request.method == 'POST':
        code = request.form['code']
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as tf:
            tf.write(code)
            temp_name = tf.name
        try:
            output = subprocess.check_output(
                ['python3', temp_name],
                stderr=subprocess.STDOUT,
                timeout=5,
                universal_newlines=True
            )
        except subprocess.CalledProcessError as e:
            output = e.output
        except subprocess.TimeoutExpired:
            output = 'Error: Execution timed out.'
    return render_template_string(HTML, code=code, output=output)

@app.route('/api/execute', methods=['POST'])
def execute_code():
    """API endpoint to execute Python code and return the output as JSON"""
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    data = request.get_json()
    code = data.get('code', '')
    user_input = data.get('input', '')
    
    if not code:
        return jsonify({"error": "No code provided"}), 400
    
    # Write code to a temporary file
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as tf:
        tf.write(code)
        temp_name = tf.name
    
    try:
        # If user input is provided, prepare it for stdin
        input_bytes = user_input.encode() if user_input else None
        
        # Execute the Python code
        output = subprocess.check_output(
            ['python3', temp_name],
            stderr=subprocess.STDOUT,
            timeout=5,
            universal_newlines=True,
            input=input_bytes
        )
        
        return jsonify({
            "output": output,
            "error": None,
            "success": True
        })
    except subprocess.CalledProcessError as e:
        return jsonify({
            "output": e.output,
            "error": "Execution failed with error code: " + str(e.returncode),
            "success": False
        })
    except subprocess.TimeoutExpired:
        return jsonify({
            "output": "Error: Execution timed out.",
            "error": "Execution timed out after 5 seconds",
            "success": False
        })
    except Exception as e:
        return jsonify({
            "output": "",
            "error": str(e),
            "success": False
        })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
