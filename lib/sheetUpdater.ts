export const runtime = 'nodejs';


import { google } from 'googleapis';

export async function update(data: any[]) {
  try {
    console.log("Updating Google Sheets with data:", data);
    const auth = new google.auth.JWT({
      email: "dmo-328@yatsusquad.iam.gserviceaccount.com",
      key: ("-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwpau3kxZdsgFM\njknIUbRrKXjjQrNxHUULyh0uIDp5o1nG4U0DOOfqDS/wntxjDzYagrgfdjAzcJ1g\n2p3AhB0ABPEUpkY3m7E3EsRsC/Zqq3oidcr5ByInzGBGJ+08WCEr0gbWyz6GAv09\n4RDjWgkz6brc8pDp1hfSr5zsTpi4EFhTmcgynzB/lJhVPbP0ZWsaw3RQsXuZEZpg\n0mx7HDkXt5bikPipJuUcaJVJtQ+tiAJpJFVdD/IZjuY0k22qrMkvd4wkc3plWp6F\nFstB7p/9QoRYbc1VxdJARfKsihHta5TU+82sSo1q9B3tcOtZwWnmYtEXddOMorZv\nv2FTrZG1AgMBAAECggEAUDFl21jy9mYxIMgXxtEQzvVs4/8L53YaOlfvF1maMk5u\nG1N82tGityZ1dQ8pje8B6NcfL2lASJn/WFDm/Nb9M10K9QznI6eStCXY9hQYMiTW\ntX40Pwl2AAtQSYkmshZwOKyIXkq2f7Art0PNnujo9KBPLK8SCpYfCo6e9shXnHdL\npZXNgMYnSpUCog6djsr1F0EZV35hXfKpB2IWeP/9hxdWzhK/rJTHKkUCqEpwPjg9\nLJmQmAebHpHJAi0PR2IjDccmBW4dFnwnKl6gv24EOl5ftqmoVNDwojEm5KEYI3RG\n+aob957bjUJTOiE0GbYlBHAuYS2qrQtXobHjgm4voQKBgQD499/ElQHRL9j4Isbf\nRcEQK+Ii28N5lHn99R1mFKDYxRLJxmlkJGWI4CUi6jVyTjyrogXYyP/d0X5jy3CJ\nLyAfhEFBbxyMMJOQtj62clSodHa0K7y82TzptJ+BLKJv3brn4sH3WNlqBkPW7PDD\nIECy0oHaxrg0nXwehTR1BBPCSwKBgQC1ouPok1OmEXfqV1lw9ihq4kx9gaqt3Qu+\n48xylV9N0F1eK0j8H0DP0ZncrbiJirm45VlL5daBZtxV6KL7tfqSim1lg8+li3/3\nhJbd9zFOIFmYyY5y3aaq133jyTcHR4v3GZcy5SSQzoHgvhrYoB4VorypWGpdhFW0\npWslIc97/wKBgHtdh9nG5AGdres2gEi+La4vsHwJXVDvS4uVW53rdtAyxt6InExs\n5IrwVjZ4y0b6kYGSZUdIQdDOL8yPUBIJ8ebsB9G+luy4XUaFp4mMGXrnSrJ4Qatq\nEY7UW30Meujne+fPKsG/muu4cwEaoyps3uI9AO9BLKGVr50H8DhTbt8FAoGACExC\nwTNJ1QJjSg9nhKOaQRfJispLs9mvWa8qfemZCwMD4PN1SB9dZKEcuFovXgk6ZtoD\ndFYxsIO0eTBBkeJEakFssgCNkfCHjhU+lzFdzUXpEfPTUCgUHyXtGGTu4KRCHq3K\nnIafXwYwJMZKj67w8OgYWlwxr8gF6lTMSkv7IJ0CgYEAqkyEClfYvX1+B1QfrErD\n0uaHKdBdzSJJo4lNSLrxMTtzt3NPR2IV1c+dE9ImmUbkpjfjSXoaA6Q8I5uR6JSL\ne+xYpszcND7ajIZ+NbBvwN7a3CHCbCW8Sv8b95SPG+mQZjpLpzs/XaF4lgnIpedC\n5u22By8T+U9iuTtZpYykFFA=\n-----END PRIVATE KEY-----\n").replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const SPREADSHEET_ID = '1UMPO8EC3_Vcxd4zax0gjENNRb1aPaLJQ1KiL1EI7Jls';
    const SHEET_NAME = 'Sheet1';

    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [data] },
    });

    return res.data;
  } catch (error) {
    console.error('Google Sheets update failed:', error);
    throw error;
  }
}