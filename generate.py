import json
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

# Charger les données
with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Charger le template et injecter les données
env = Environment(loader=FileSystemLoader("."))
template = env.get_template("template.html")
html_final = template.render(**data)

# Sauvegarder le HTML
with open("cv.html", "w", encoding="utf-8") as f:
    f.write(html_final)
print("✅ cv.html généré")

# Générer le PDF
HTML(string=html_final).write_pdf("cv.pdf")
print("✅ cv.pdf généré")
