class ZeroFrameP extends ZeroFrame {
		cmdp(cmd, params={}) {
				return new Promise((resolve, reject) => {
						this.cmd(cmd, params, (res) => {
								if (res && res.error) {
										reject(res.error)
								} else {
										resolve(res)
								}
						})
				})
		}
}
