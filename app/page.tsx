'use client'


import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Download, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import MondrianBackground from '@/components/MondrianBackground'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('图片生成失败')
      }

      const imageData = await response.json()
      setImage(`data:image/png;base64,${imageData}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (image) {
      const link = document.createElement('a')
      link.href = image
      link.download = 'generated-image.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <MondrianBackground />
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
              AI 图片生成器
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                  图片描述
                </label>
                <div className="mt-1">
                  <textarea
                    id="prompt"
                    name="prompt"
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="输入您想要生成的图片描述..."
                  />
                </div>
              </div>
              
              <div>
                <Button 
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                  disabled={loading || !prompt.trim()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="-ml-1 mr-3 h-5 w-5" />
                      生成图片
                    </>
                  )}
                </Button>
              </div>
            </form>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      生成失败
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {image && (
              <div className="mt-8 space-y-4">
                <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={image}
                    alt="Generated image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                
                <Button
                  onClick={handleDownload}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Download className="-ml-1 mr-3 h-5 w-5" />
                  下载图片
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
