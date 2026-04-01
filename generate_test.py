import pandas as pd
import xlsxwriter

# Data to simulate the user's issue
data = {
    'Nome Completo (*)': ['Pedro Developer', 'Sandra Athaydes'],
    'E-mail': ['devpedro001@gmail.com', 'sandra_athaydes@cargill.com'],
    'Empresa': ['LimpaLeads', 'Cargill']
}

df = pd.DataFrame(data)

writer = pd.ExcelWriter('test_leads.xlsx', engine='xlsxwriter')
df.to_excel(writer, index=False, sheet_name='Leads')

workbook = writer.book
worksheet = writer.sheets['Leads']

# Create a hyperlink for the first email to simulate "mailto:devpedro001@gmail.com"
worksheet.write_url('B2', 'mailto:devpedro001@gmail.com', string='devpedro001@gmail.com')

# Create a regular text cell for the second email but maybe as a number? No, just string to test.
# Let's test a plain string for the second one
worksheet.write_string('B3', 'sandra_athaydes@cargill.com')

writer.close()
print("Arquivo Excel gerado com sucesso.")
