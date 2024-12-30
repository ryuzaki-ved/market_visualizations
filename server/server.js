import express from 'express';
import cors from 'cors';
import { PythonShell } from 'python-shell';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/nse-data', async (req, res) => {
  const { reportId, startDate, endDate } = req.body;

  try {
    const options = {
      mode: 'text',
      pythonPath: 'python3',
      pythonOptions: ['-u'],
      scriptPath: __dirname,
      args: [reportId, startDate, endDate]
    };

    const results = await PythonShell.run('fetch.py', options);
    res.json({ data: results });
  } catch (error) {
    console.error('Error fetching NSE data:', error);
    res.status(500).json({ error: 'Failed to fetch NSE data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});