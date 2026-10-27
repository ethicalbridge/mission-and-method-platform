# Copies English strings from a strings JSON ({"key": ["English","Español"]}) into the fallback text of
# matching data-i18n elements in the given HTML files (only elements whose content is plain text).
# Usage: python3 scripts/sync-i18n-html.py strings.json page1.html page2.html ...
import json,re,sys,html
strings=json.load(open(sys.argv[1]))
for f in sys.argv[2:]:
    s=open(f).read();n=0
    for k,(en,es) in strings.items():
        pat=re.compile(r'(<([a-z0-9]+)\b[^>]*\bdata-i18n="'+re.escape(k)+r'"[^>]*>)([^<]*)(</\2>)')
        s,c=pat.subn(lambda m:m.group(1)+html.escape(en,quote=False)+m.group(4),s);n+=c
    open(f,'w').write(s);print(f,n,'elements')
