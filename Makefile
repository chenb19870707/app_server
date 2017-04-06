# dev
dev:
	pm2 restart ecosystem.yml --env development --only app_server_dev && pm2 logs app_server_dev

watch:
	webpack --watch

bundle:
	NODE_ENV=production webpack

# pre
pre:
	pm2 restart ecosystem.yml --env prerelease --only app_server_pre && pm2 logs app_server_pre

# pro
setup:
	pm2 deploy ecosystem.yml production setup

deploy:
	pm2 deploy ecosystem.yml production

pro:
	pm2 restart ecosystem.yml --env production --only app_server_pro && pm2 logs app_server_pro
