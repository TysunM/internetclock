# Internet Clock - Fedora + Podman Deployment Guide

## Complete deployment package for your Fedora server using Podman

### Prerequisites

1. **Install Podman and tools:**
   ```bash
   sudo dnf install -y podman podman-compose curl
   ```

2. **Enable Podman service (optional for auto-restart):**
   ```bash
   systemctl --user enable podman.socket
   systemctl --user start podman.socket
   ```

### Quick Deployment

1. **Make deployment script executable:**
   ```bash
   chmod +x podman-deploy.sh
   ```

2. **Run automated deployment:**
   ```bash
   ./podman-deploy.sh
   ```

### Manual Deployment

1. **Build the container image:**
   ```bash
   podman build -t internet-clock:latest .
   ```

2. **Run the container:**
   ```bash
   sudo podman run -d \
     --name internet-clock-app \
     --restart unless-stopped \
     -p 80:80 \
     -e NODE_ENV=production \
     -e PORT=80 \
     internet-clock:latest
   ```

### Using Podman Compose

1. **Start with compose:**
   ```bash
   podman-compose -f podman-compose.yml up -d
   ```

2. **Stop with compose:**
   ```bash
   podman-compose -f podman-compose.yml down
   ```

### Firewall Configuration

If using firewalld on Fedora, open port 80:

```bash
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --reload
```

**Note:** Port 80 requires root privileges. You'll need to run podman with `sudo` or configure rootless podman with proper port mapping.

### Access Your Internet Clock

- Local: http://localhost
- Network: http://YOUR_SERVER_IP

### Container Management

**View logs:**
```bash
podman logs internet-clock-app
```

**Check status:**
```bash
podman ps
```

**Restart container:**
```bash
podman restart internet-clock-app
```

**Stop container:**
```bash
podman stop internet-clock-app
```

**Remove container:**
```bash
podman rm internet-clock-app
```

**Update container:**
```bash
podman stop internet-clock-app
podman rm internet-clock-app
podman build -t internet-clock:latest .
sudo podman run -d --name internet-clock-app --restart unless-stopped -p 80:80 -e PORT=80 internet-clock:latest
```

### Health Monitoring

The container includes a health check endpoint:
```bash
curl http://localhost/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "version": "1.0.0"
}
```

### Systemd Integration (Optional)

Create a systemd service for automatic startup:

1. **Create service file:**
   ```bash
   mkdir -p ~/.config/systemd/user
   cat > ~/.config/systemd/user/internet-clock.service << EOF
   [Unit]
   Description=Internet Clock Container
   After=network.target
   
   [Service]
   Type=forking
   ExecStart=/usr/bin/podman start internet-clock-app
   ExecStop=/usr/bin/podman stop internet-clock-app
   RemainAfterExit=yes
   
   [Install]
   WantedBy=default.target
   EOF
   ```

2. **Enable and start:**
   ```bash
   systemctl --user daemon-reload
   systemctl --user enable internet-clock.service
   systemctl --user start internet-clock.service
   ```

### Performance Tuning

For production deployment on Fedora:

1. **Set resource limits:**
   ```bash
   podman run -d \
     --name internet-clock-app \
     --restart unless-stopped \
     --memory=256m \
     --cpus=1.0 \
     -p 5000:5000 \
     internet-clock:latest
   ```

2. **Enable SELinux context (if SELinux is enabled):**
   ```bash
   sudo setsebool -P container_manage_cgroup on
   ```

### Troubleshooting

**Port already in use:**
```bash
sudo lsof -i :5000
podman stop internet-clock-app
```

**Container won't start:**
```bash
podman logs internet-clock-app
podman inspect internet-clock-app
```

**Network issues:**
```bash
podman network ls
podman network inspect podman
```

### Production Considerations

- Use a reverse proxy (nginx/Apache) for SSL termination
- Set up log rotation for container logs
- Monitor container health with systemd or external monitoring
- Consider using Podman pod for complex deployments
- Backup any persistent data volumes

Your Internet Clock is now ready for production on Fedora with Podman!