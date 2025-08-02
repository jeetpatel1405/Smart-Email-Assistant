import { useState } from 'react'
import './App.css'
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  CircularProgress,
  Paper,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Alert,
  Chip
} from '@mui/material'
import { 
  ContentCopy, 
  Send, 
  AutoAwesome, 
  Email,
  CheckCircle,
  Error
} from '@mui/icons-material'
import axios from 'axios'

function App() {
  const [emailContent, setEmailContent] = useState('')
  const [tone, setTone] = useState('')
  const [generatedReply, setGeneratedReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setGeneratedReply('')
    setCopied(false)

    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone
      })
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    }
    catch (error) {
      setError('Error generating reply. Please try again.')
    }
    finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const toneOptions = [
    { value: 'professional', label: 'Professional', color: 'primary' },
    { value: 'friendly', label: 'Friendly', color: 'success' },
    { value: 'casual', label: 'Casual', color: 'warning' },
    { value: 'formal', label: 'Formal', color: 'info' }
  ]

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'white',
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Email sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                color: 'text.primary', 
                fontWeight: 700
              }}
            >
              Email Assistant
            </Typography>
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary', 
              fontWeight: 300,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Transform your email communication with AI-powered professional responses
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
          {/* Input Section */}
          <Paper elevation={8} sx={{ p: 4, borderRadius: 3, background: 'rgba(255,255,255,0.95)' }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              <AutoAwesome sx={{ mr: 1, color: 'primary.main' }} />
              Compose Your Email
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={8}
              variant="outlined"
              label="Original Email Content"
              placeholder="Paste the email you'd like to respond to here..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Tone Selection</InputLabel>
              <Select
                value={tone}
                label="Tone Selection"
                onChange={(e) => setTone(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">Default Tone</MenuItem>
                {toneOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Chip 
                      label={option.label} 
                      size="small" 
                      color={option.color} 
                      sx={{ mr: 1 }}
                    />
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button 
              variant="contained" 
              onClick={handleSubmit} 
              disabled={!emailContent.trim() || loading} 
              fullWidth
              size="large"
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
              sx={{ 
                borderRadius: 2, 
                py: 1.5,
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                  color: 'white'
                }
              }}
            >
              {loading ? 'Generating...' : 'Generate Professional Reply'}
            </Button>

            {error && (
              <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                <Error sx={{ mr: 1 }} />
                {error}
              </Alert>
            )}
          </Paper>

          {/* Output Section */}
          <Paper elevation={8} sx={{ p: 4, borderRadius: 3, background: 'rgba(255,255,255,0.95)' }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
              Generated Reply
            </Typography>
            
            {generatedReply ? (
              <Card variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.6,
                      color: 'text.primary'
                    }}
                  >
                    {generatedReply}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Box 
                sx={{ 
                  border: '2px dashed #e0e0e0', 
                  borderRadius: 2, 
                  p: 4, 
                  textAlign: 'center',
                  background: '#fafafa'
                }}
              >
                <Email sx={{ fontSize: 48, color: '#e0e0e0', mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  Your generated reply will appear here
                </Typography>
              </Box>
            )}

            {generatedReply && (
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="outlined" 
                  onClick={handleCopy}
                  startIcon={copied ? <CheckCircle /> : <ContentCopy />}
                  sx={{ 
                    borderRadius: 2,
                    borderColor: copied ? 'success.main' : 'primary.main',
                    color: copied ? 'success.main' : 'primary.main'
                  }}
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </Button>
                <Button 
                  variant="text" 
                  onClick={() => setGeneratedReply('')}
                  sx={{ borderRadius: 2 }}
                >
                  Clear
                </Button>
              </Box>
            )}
          </Paper>
        </Box>

    
      </Container>
    </Box>
  )
}

export default App
