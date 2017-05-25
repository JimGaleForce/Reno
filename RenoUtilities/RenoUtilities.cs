using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Windows.Foundation;
using Windows.Foundation.Metadata;
using Windows.UI.Core;

namespace RenoUtilities
{
    [AllowForWeb]
    public sealed class Utils
    {
        private CoreDispatcher m_dispatcher;

        public Utils()
        {
            m_dispatcher = CoreWindow.GetForCurrentThread().Dispatcher;
        }

        public static string NonAsyncTest()
        {
            return "123";
        }

        public static IAsyncOperation<string> GetUrlToLocalAsync(string url, string local)
        {
            Func<byte[], Task<string>> suffix = async data =>
            {
                try
                {
                    var newfile = await Windows.Storage.ApplicationData.Current.LocalFolder.CreateFileAsync(local, Windows.Storage.CreationCollisionOption.OpenIfExists);
                    var stream = await newfile.OpenStreamForWriteAsync();
                    await stream.WriteAsync(data, 0, data.Length);
                    await stream.FlushAsync();
                }
                catch (Exception)
                {
                    //ignore
                }

                return local;
            };

            return GetBinaryUrl(url, suffix).AsAsyncOperation<string>();
        }

        private static async Task<string> GetBinaryUrl(string url, Func<byte[], Task<string>> suffix = null)
        {
            var request = HttpWebRequest.Create(url);
            var response = await request.GetResponseAsync();
            int length = (int) response.ContentLength;
            var data = new byte[length];
            
            using (var reader = new BinaryReader(response.GetResponseStream()))
            {
                data = reader.ReadBytes(length);
            }

            if (suffix != null)
            {
                return await suffix.Invoke(data);
            }

            return "";
        }

        public static IAsyncOperation<string> GetUrlAsync(string url)
        {
            return GetUrl(url).AsAsyncOperation<string>();
        }

        private static async Task<string> GetUrl(string url, Func<string, Task<string>> suffix = null)
        {
            var request = HttpWebRequest.Create(url);
            var response = await request.GetResponseAsync();

            var webResult = string.Empty;
            using (var reader = new StreamReader(response.GetResponseStream()))
            {
                webResult = reader.ReadToEnd();
            }

            if (suffix != null)
            {
                return await suffix.Invoke(webResult);
            }

            return webResult;
        }
    }
}
