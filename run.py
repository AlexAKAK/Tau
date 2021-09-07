import os
import sys



if not os.path.isdir('node_modules'):
    print('[Installing node_modules]')
    os.system('npm install')

if (not os.path.exists('config.json')):
    config = open('config.json', 'w+')
    config.write('''
    {
    "token": "",
    "prefix": "t!",
    "youtubeAPIKey": "",
    "tenorAPIKey": ""
    }
    ''')
    print("config.json must be filled out")
    config.close()
    sys.exit(1)


print('[Compiling src to out]')
os.system('tsc --outdir out')

print('[Executing index.js]')
os.system('node out/index.js')